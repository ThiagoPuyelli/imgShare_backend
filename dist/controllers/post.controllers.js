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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsUser = exports.getPost = exports.getPosts = exports.updatePost = exports.deletePost = exports.savePost = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entities/User.entity");
const Post_entity_1 = require("../entities/Post.entity");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("cloudinary");
var savePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        const post = new Post_entity_1.Post();
        cloudinary_1.v2.uploader.upload(path_1.default.join(__dirname, "../uploads/" + req.file.filename), (err, image) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                res.json({ error: "Error to save image" });
            const { url, public_id } = image;
            if (url && public_id) {
                post.image = url;
                post.public_id = public_id;
                fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
                if (req.body.description) {
                    post.description = req.body.description;
                }
                const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ id: req.headers["x-access-token"].split("|")[1] });
                post.user = user;
                const postSave = yield typeorm_1.getRepository(Post_entity_1.Post).save(post);
                res.json(postSave);
            }
        }));
    }
    else {
        res.json({
            error: "La imagen no es válida"
        });
    }
});
exports.savePost = savePost;
var deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post } = req.body;
    if (post) {
        const postDeleted = yield typeorm_1.getRepository(Post_entity_1.Post).delete(post);
        if (postDeleted) {
            cloudinary_1.v2.uploader.destroy(post.public_id, (err, deleted) => {
                if (err)
                    res.json({ error: "Error to destroy image" });
                res.json(postDeleted);
            });
        }
    }
    else if (!post) {
        res.json({
            error: "el id del post esta incorrecto, o no eres el dueño del post"
        });
    }
});
exports.deletePost = deletePost;
var updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post } = req.body;
    if (post) {
        for (let i in req.body) {
            if (i != "user" && i != "post")
                post[i] = req.body[i];
        }
        if (req.file) {
            cloudinary_1.v2.uploader.destroy(post.public_id, (err, imageDeleted) => {
                if (err)
                    res.json({ error: "Error to delete image" });
                cloudinary_1.v2.uploader.upload(path_1.default.join(__dirname, "../uploads/" + req.file.filename), (err, image) => {
                    if (err)
                        res.json({ error: "Error to update image" });
                    const { url, public_id } = image;
                    if (url && public_id) {
                        post.image = url;
                        post.public_id = public_id;
                        fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + req.file.filename));
                    }
                });
            });
        }
        const postUpdate = yield typeorm_1.getRepository(Post_entity_1.Post).update({ id: post.id }, post);
        res.json(postUpdate);
    }
    else {
        req.json({
            error: "El post no es válido"
        });
    }
});
exports.updatePost = updatePost;
var getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var posts = yield typeorm_1.getRepository(Post_entity_1.Post).find({ relations: ["user"] });
    res.json(posts);
});
exports.getPosts = getPosts;
var getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield typeorm_1.getRepository(Post_entity_1.Post).findOne({ id: req.params.id });
    if (post) {
        res.json(post);
    }
    else {
        res.json({
            error: "Ha ocurrido un error, o el post no existe"
        });
    }
});
exports.getPost = getPost;
var getPostsUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ id: req.headers["x-access-token"].split("|")[1] });
    const posts = yield typeorm_1.getRepository(Post_entity_1.Post).find({ user });
    if (posts) {
        res.json(posts);
    }
    else {
        res.json({
            error: "Ha ocurrido un error o esta cuenta no contiene posts"
        });
    }
});
exports.getPostsUser = getPostsUser;
