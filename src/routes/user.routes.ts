import { Router } from "express";
const router = Router();
import { register, login, update, getUser } from "../controllers/user.controllers";
import multer from "../middlewares/multer";
import verifyToken from "../middlewares/verifyToken";

router.post("/users/register", multer.single("image"), register);
router.post("/users/login", login);
router.put("/users", verifyToken, multer.single("image"), update);
router.get("/auth", verifyToken, (req, res) => res.json({auth: true}));
router.get("/users/:id", verifyToken, getUser);

export default router;