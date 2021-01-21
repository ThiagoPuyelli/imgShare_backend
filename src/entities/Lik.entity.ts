import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Post } from "./Post.entity";

@Entity()
export class Lik {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, (user) => user.id,{
        nullable: false
    })
    @JoinColumn()
    user: User;

    @ManyToOne(type => Post, (post) => post.id,{ 
        nullable: false
    })
    @JoinColumn()
    post: Post;

}