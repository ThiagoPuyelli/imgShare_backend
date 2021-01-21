import { Router } from "express";
const router = Router();
import verifyToken from "../middlewares/verifyToken";
import { setLik, getLikesToPost } from "../controllers/lik.controllers";

router.post("/lik/:id", verifyToken, setLik);
router.get("/lik/:id", verifyToken, getLikesToPost);

export default router;