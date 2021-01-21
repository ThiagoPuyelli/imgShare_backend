import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, Timestamp } from "typeorm";
import { User } from "../entities/User.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text"
    })
    image: string;

    @Column({
        default: 0
    })
    likes: number;

    @Column({
        type: "text",
        nullable: true
    })
    description: string;

    @Column({
        type: "timestamp",
        default: () => "now()"
    })
    date: Timestamp;

    @ManyToOne(type => User, {
        nullable: false
    })
    user: User;

}