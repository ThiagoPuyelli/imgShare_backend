import { User } from "../entities/User.entity";
import { Post } from "../entities/Post.entity";
import { getRepository } from "typeorm";

export default (param: string) => {
    return async (req, res, next) => {
        const user: User = await getRepository(User).findOne({id: req.headers["x-access-token"].split("|")[1]});
        const post: Post = await getRepository(Post).findOne({id: req.params[param], user});
        if(!user || !post){
            res.json({
                error: "Ha ocurrido un fallo al buscar el post o el usuario"
            });
        }
        req.body.user = user;
        req.body.post = post;
        next(null, true);
    }
}