import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Post } from "./Post.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        length: 20
    })
    username: string;

    @Column({
        type: "text",
        nullable: true
    })
    description: string;

    @Column({
        type: "varchar",
        nullable: true
    })
    image: string;

    @Column({
        length: 9
    })
    positionImage: string;

    @Column({
        type: "varchar",
        unique: true
    })
    email: string;

    @Column({
        type: "varchar"
    })
    password: string;

    @OneToMany(type => Post, post => post.id)
    post: Post;
    
}