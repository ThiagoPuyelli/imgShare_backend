import { Router } from "express";
const router = Router();
import verifyToken from "../middlewares/verifyToken";
import { setLik, getLikesToPost, verifyLik, deleteLik } from "../controllers/lik.controllers";

router.get("/lik/:id", verifyToken, setLik);
router.get("/lik/:id", verifyToken, getLikesToPost);
router.get("/lik-verify/:id", verifyToken, verifyLik);
router.delete("/lik/:id", verifyToken, deleteLik);

export default router;