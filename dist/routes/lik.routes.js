"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const lik_controllers_1 = require("../controllers/lik.controllers");
router.get("/lik/:id", verifyToken_1.default, lik_controllers_1.setLik);
router.get("/lik/:id", verifyToken_1.default, lik_controllers_1.getLikesToPost);
router.get("/lik-verify/:id", verifyToken_1.default, lik_controllers_1.verifyLik);
exports.default = router;
