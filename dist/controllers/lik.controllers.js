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
exports.verifyLik = exports.getLikesToPost = exports.setLik = void 0;
const Lik_entity_1 = require("../entities/Lik.entity");
const Post_entity_1 = require("../entities/Post.entity");
const User_entity_1 = require("../entities/User.entity");
const typeorm_1 = require("typeorm");
var setLik = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield typeorm_1.getRepository(Post_entity_1.Post).findOne({ id: req.params.id });
    const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ id: req.headers["x-access-token"].split("|")[1] });
    const verifyPostLike = yield typeorm_1.getRepository(Lik_entity_1.Lik).findOne({ user, post });
    if (verifyPostLike) {
        res.json({
            error: "Ha este post ya le diste lik"
        });
    }
    else {
        if (post.user != user) {
            const lik = new Lik_entity_1.Lik();
            lik.post = post;
            lik.user = user;
            if (lik) {
                const likSaved = yield typeorm_1.getRepository(Lik_entity_1.Lik).save(lik);
                if (likSaved) {
                    res.json(likSaved);
                }
                else {
                    res.json({
                        error: "Ha ocurrido un fallo al guardar el lik"
                    });
                }
            }
            else {
                res.json({
                    error: "Los datos del lik no son válidos"
                });
            }
        }
        else {
            res.json({
                error: "Eres dueño del Post"
            });
        }
    }
});
exports.setLik = setLik;
var getLikesToPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield typeorm_1.getRepository(Post_entity_1.Post).findOne({ id: req.params.id });
    if (post) {
        const liks = yield typeorm_1.getRepository(Lik_entity_1.Lik).find({ relations: ["user", "post"] });
        const liksToPost = [];
        for (let i of liks) {
            if (i.post.id == post.id) {
                liksToPost.push(i.user);
            }
        }
        if (liks && liksToPost.length > 0) {
            res.json(liksToPost);
        }
        else {
            res.json({
                error: "Ha ocurrido un error, o la aplicacion no contiene likes"
            });
        }
    }
    else {
        res.json({
            error: "El post no es válido"
        });
    }
});
exports.getLikesToPost = getLikesToPost;
var verifyLik = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield typeorm_1.getRepository(Post_entity_1.Post).findOne({ id: req.params.id });
    const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ id: req.headers["x-access-token"].split("|")[1] });
    const verifyPostLike = yield typeorm_1.getRepository(Lik_entity_1.Lik).findOne({ user, post });
    if (verifyPostLike) {
        res.json({
            lik: true
        });
    }
    else {
        res.json({
            lik: false
        });
    }
});
exports.verifyLik = verifyLik;
