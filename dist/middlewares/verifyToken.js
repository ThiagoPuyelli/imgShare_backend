"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const token = req.headers['x-access-token'].split("|")[0];
    if (!token) {
        return res.status(404).send({
            auth: false,
            message: "Usuario no identificado"
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_PASSWORD, (err, decoded) => {
        if (err)
            return res.status(404).send({ error: "Token inválido" });
        if (decoded) {
            req.decoded = decoded;
            next();
        }
    });
};
