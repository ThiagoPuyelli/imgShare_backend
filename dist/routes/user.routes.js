"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const user_controllers_1 = require("../controllers/user.controllers");
const multer_1 = __importDefault(require("../middlewares/multer"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
router.post("/users/register", multer_1.default.single("image"), user_controllers_1.register);
router.post("/users/login", user_controllers_1.login);
router.put("/users", verifyToken_1.default, multer_1.default.single("image"), user_controllers_1.update);
router.get("/auth", verifyToken_1.default, (req, res) => res.json({ auth: true }));
exports.default = router;
