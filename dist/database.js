"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./entities/User.entity");
const Post_entity_1 = require("./entities/Post.entity");
const Lik_entity_1 = require("./entities/Lik.entity");
exports.default = () => {
    return typeorm_1.createConnection({
        type: "mysql",
        host: "localhost",
        username: "root",
        port: 3306,
        password: process.env.SQL_PASSWORD,
        database: "img_share",
        entities: [
            User_entity_1.User,
            Post_entity_1.Post,
            Lik_entity_1.Lik
        ],
        synchronize: true
    });
};
