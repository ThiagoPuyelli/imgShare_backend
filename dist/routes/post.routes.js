"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const post_controllers_1 = require("../controllers/post.controllers");
const multer_1 = __importDefault(require("../middlewares/multer"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const findPost_1 = __importDefault(require("../methods/findPost"));
router.post("/posts", verifyToken_1.default, multer_1.default.single("image"), post_controllers_1.savePost);
router.delete("/posts/:id", verifyToken_1.default, findPost_1.default("id"), post_controllers_1.deletePost);
router.put("/posts/:id", verifyToken_1.default, multer_1.default.single("image"), findPost_1.default("id"), post_controllers_1.updatePost);
router.get("/posts", post_controllers_1.getPosts);
router.get("/posts/:id", verifyToken_1.default, post_controllers_1.getPost);
router.get("/posts-user/:id", verifyToken_1.default, post_controllers_1.getPostsUser);
exports.default = router;
