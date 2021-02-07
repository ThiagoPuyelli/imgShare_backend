import { Router } from "express"
const router = Router();
import { savePost, deletePost, updatePost, getPosts, getPost, getPostsUser } from "../controllers/post.controllers"; 
import multer from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";
import findPost from "../methods/findPost";

router.post("/posts", verifyToken, multer.single("image"), savePost);
router.delete("/posts/:id", verifyToken, findPost("id"), deletePost);
router.put("/posts/:id", verifyToken, multer.single("image"), findPost("id"), updatePost);
router.get("/posts", getPosts);
router.get("/posts/:id", verifyToken, getPost);
router.get("/posts-user/:id", verifyToken, getPostsUser);

export default router;