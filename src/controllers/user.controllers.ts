import jwt from "jsonwebtoken";
import { User } from "../entities/User.entity";
import { getRepository } from "typeorm";
import comparePassword from "../methods/comparePassword"
import encryptPassword from "../methods/encryptPassword";
import fs from "fs";
import path from "path";
import { v2 } from "cloudinary";

export var register = async (req, res) => {
    const user: User = new User();
    for(let i in req.body){
        if(i + "" == "password"){
            user.password = await encryptPassword(req.body.password);
        } else {
            user[i] = req.body[i];
        }
    }
    if(req.file){
        v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename), async (err, image) => {
            if(err) res.json({error: "Error al guardar imagen"});

            const { url, public_id } = image

            if(url && public_id){
                user.image = url;
                user.public_id = public_id;
            }

            fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));

            if(user){
                const userSave = await getRepository(User).save(user);
        
                if(userSave){
        
                    const token = await jwt.sign({id: userSave.id}, process.env.JWT_PASSWORD, {
                        expiresIn: 60 * 60 * 24
                    });
        
                    res.json({token: token + "|" + userSave.id});
                } else {
                    res.json({
                        error: "Ocurrió un error al almacenar el usuario"
                    });
                }
            }
        })
    } else {
        if(user){
            const userSave = await getRepository(User).save(user);
    
            if(userSave){
    
                const token = await jwt.sign({id: userSave.id}, process.env.JWT_PASSWORD, {
                    expiresIn: 60 * 60 * 24
                });
    
                res.json({token: token + "|" + userSave.id});
            } else {
                res.json({
                    error: "Ocurrió un error al almacenar el usuario"
                });
            }
        }
    }

    

}

export var login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    if(email && password){
        const user: User = await getRepository(User).findOne({email});

        if(user){
            const auth: boolean = await comparePassword(password, user.password);
            if(auth){
                const token = await jwt.sign({id: user.id}, process.env.JWT_PASSWORD, {
                    expiresIn: 60 * 60 * 24
                });

                res.json({token: token + "|" + user.id});
            } else {
                res.json({
                    error: "La contraseña no es válida"
                });
            }
        } else {
            res.json({
                error: "El email no es válido"
            });
        }
    } else {
        res.json({
            error: "La información no es válida"
        });
    }
}

export var update = async (req, res) => {
    const user: User = await getRepository(User).findOne({id: req.headers["x-access-token"].split("|")[1]});

    if(user){
        for(let i in req.body){
            user[i] = req.body[i];
        }

        if(req.file){
            v2.uploader.destroy(user.public_id, (err, deleteImage) => {
                if(err) res.json({error: "Error al guardar imagen"});

                if(deleteImage){
                    fs.unlinkSync(path.join(__dirname, "../uploads/" + user.image));
                    
                    v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename), (err, image) => {
                        if(err) res.json({error: "Error al guardar imagen"});
                         
                        const { url, public_id } = image;
                        if(url && public_id){
                            user.image = url;
                            user.public_id = public_id;
                        }
                        fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));
                    })
                }
            })
        }

        if(user){
            const userUpdate = await getRepository(User).update({id: user.id}, user);
            res.json(userUpdate);
        } else {
            res.json({
                error: "Ocurrió un error al actualizar el usuario"
            });
        }
    } else {
        res.json({
            error: "El usuario no es válido"
        });
    }
}