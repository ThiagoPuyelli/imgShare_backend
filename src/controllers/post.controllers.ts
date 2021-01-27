import { getRepository } from "typeorm";
import { User } from "../entities/User.entity";
import { Post } from "../entities/Post.entity";
import fs from "fs";
import path from "path";
import {v2} from "cloudinary";

export var savePost = async (req, res) => {
    if(req.file){
        const post: Post = new Post();

        v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename), async (err, image) => {
            if(err) res.json({error: "Error to save image"});

            const { url, public_id } = image;
            if(url && public_id){
                post.image = url;
                post.public_id = public_id;

                fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));
                if(req.body.description){
                    post.description = req.body.description;
                }
                const user: User = await getRepository(User).findOne({id: req.headers["x-access-token"].split("|")[1]});
                post.user = user;
                const postSave = await getRepository(Post).save(post);
                res.json(postSave);
            } 
                        
        })
    } else {
        res.json({
            error: "La imagen no es válida"
        });
    }
}

export var deletePost = async (req, res) => {
    const { post } = req.body;

    if(post){
        const postDeleted = await getRepository(Post).delete(post);

        if(postDeleted){
            v2.uploader.destroy(post.public_id, (err, deleted) => {
                if(err) res.json({error: "Error to destroy image"});
                
                res.json(postDeleted);
            })
        }
    } else if(!post){
        res.json({
            error: "el id del post esta incorrecto, o no eres el dueño del post"
        });
    }
}

export var updatePost = async (req, res) => {
    const { post } = req.body;
    
    if(post){
        for(let i in req.body){
            if(i != "user" && i != "post") post[i] = req.body[i];
        }
        if(req.file){
            v2.uploader.destroy(post.public_id, (err, imageDeleted) => {
                if(err) res.json({error: "Error to delete image"});

                v2.uploader.upload(path.join(__dirname, "../uploads/" + req.file.filename), (err, image) => {
                    if(err) res.json({error: "Error to update image"});

                    const { url, public_id } = image;
                    if(url && public_id){
                        post.image = url;
                        post.public_id = public_id;
                        
                        fs.unlinkSync(path.join(__dirname, "../uploads/" + req.file.filename));

                    }
                })
            })
        }
        const postUpdate = await getRepository(Post).update({id: post.id}, post);

        res.json(postUpdate);
    } else {
        req.json({
            error: "El post no es válido"
        });
    }
}

export var getPosts = async (req, res) => {

    var posts: any = await getRepository(Post).find({relations: ["user"]});

    res.json(posts);
};

export var getPost = async (req, res) => {
    const post: Post = await getRepository(Post).findOne({id: req.params.id});

    if(post){
        res.json(post);
    } else {
        res.json({
            error: "Ha ocurrido un error, o el post no existe"
        });
    }
}

export var getPostsUser = async (req, res) => {
    const user: User = await getRepository(User).findOne({id: req.headers["x-access-token"].split("|")[1]});
    const posts: Array<Post> = await getRepository(Post).find({user});

    if(posts){
        res.json(posts);
    } else {
        res.json({
            error: "Ha ocurrido un error o esta cuenta no contiene posts"
        });
    }
}