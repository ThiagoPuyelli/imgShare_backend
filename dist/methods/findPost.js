"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_entity_1 = require("../entities/User.entity");
const Post_entity_1 = require("../entities/Post.entity");
const typeorm_1 = require("typeorm");
exports.default = (param) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ id: req.headers["x-access-token"].split("|")[1] });
        const post = yield typeorm_1.getRepository(Post_entity_1.Post).findOne({ id: req.params[param], user });
        if (!user || !post) {
            res.json({
                error: "Ha ocurrido un fallo al buscar el post o el usuario"
            });
        }
        req.body.user = user;
        req.body.post = post;
        next(null, true);
    });
};
