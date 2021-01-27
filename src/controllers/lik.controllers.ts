import { Lik } from "../entities/Lik.entity"; 
import { Post } from "../entities/Post.entity";
import { User } from "../entities/User.entity";
import { getRepository } from "typeorm";

export var setLik = async (req, res) => {
    const post: Post = await getRepository(Post).findOne({id: req.params.id});
    const user: User = await getRepository(User).findOne({id: req.headers["x-access-token"].split("|")[1]});
    const verifyPostLike: Lik = await getRepository(Lik).findOne({user, post});
    if(verifyPostLike){
        res.json({
            error: "Ha este post ya le diste lik"
        });
    } else {
        if(post.user != user){
            const lik: Lik = new Lik();
            lik.post = post;
            lik.user = user;
            if(lik){
                const likSaved = await getRepository(Lik).save(lik);
                if(likSaved){
                    res.json(likSaved);
                } else {
                    res.json({
                        error: "Ha ocurrido un fallo al guardar el lik"
                    })
                }
            } else {
                res.json({
                    error: "Los datos del lik no son válidos"
                });
            }
        } else {
            res.json({
                error: "Eres dueño del Post"
            });
        }
    }
}

export var getLikesToPost = async (req, res) => {
    const post: Post = await getRepository(Post).findOne({id: req.params.id});
    if(post){
        const liks: Array<Lik> = await getRepository(Lik).find({ relations: ["user", "post"]})
        const liksToPost= [];

        for(let i of liks){
            if(i.post.id == post.id){
                liksToPost.push(i.user);
            }
        }

        if(liks && liksToPost.length > 0){
            res.json(liksToPost)
        } else {
            res.json({
                error: "Ha ocurrido un error, o la aplicacion no contiene likes"
            });
        }
    } else {
        res.json({
            error: "El post no es válido"
        });
    }
}

export var verifyLik = async (req, res) => {
    const post: Post = await getRepository(Post).findOne({id: req.params.id});
    const user: User = await getRepository(User).findOne({id: req.headers["x-access-token"].split("|")[1]});
    const verifyPostLike: Lik = await getRepository(Lik).findOne({user, post});
    if(verifyPostLike){
        res.json({
            lik: true
        })
    } else {
        res.json({
            lik: false
        })
    }
}