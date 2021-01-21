import { createConnection } from "typeorm";
import { User } from "./entities/User.entity";
import { Post } from "./entities/Post.entity";
import { Lik } from "./entities/Lik.entity";
 
export default () => {return createConnection({
    type: "mysql",
    host: "localhost",
    username: "root",
    port: 3306,
    password: process.env.SQL_PASSWORD,
    database: "img_share",
    entities: [
        User,
        Post,
        Lik
    ],
    synchronize: true
})}