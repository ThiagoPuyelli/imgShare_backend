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
exports.update = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_entity_1 = require("../entities/User.entity");
const typeorm_1 = require("typeorm");
const comparePassword_1 = __importDefault(require("../methods/comparePassword"));
const encryptPassword_1 = __importDefault(require("../methods/encryptPassword"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
var register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_entity_1.User();
    for (let i in req.body) {
        if (i + "" == "password") {
            user.password = yield encryptPassword_1.default(req.body.password);
        }
        else {
            user[i] = req.body[i];
        }
    }
    if (req.file) {
        user.image = req.file.filename;
    }
    if (user) {
        const userSave = yield typeorm_1.getRepository(User_entity_1.User).save(user);
        if (userSave) {
            const token = yield jsonwebtoken_1.default.sign({ id: userSave.id }, process.env.JWT_PASSWORD, {
                expiresIn: 60 * 60 * 24
            });
            res.json({ token: token + "|" + userSave.id });
        }
        else {
            res.json({
                error: "Ocurrió un error al almacenar el usuario"
            });
        }
    }
});
exports.register = register;
var login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email && password) {
        const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ email });
        if (user) {
            const auth = yield comparePassword_1.default(password, user.password);
            if (auth) {
                const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_PASSWORD, {
                    expiresIn: 60 * 60 * 24
                });
                res.json({ token: token + "|" + user.id });
            }
            else {
                res.json({
                    error: "La contraseña no es válida"
                });
            }
        }
        else {
            res.json({
                error: "El email no es válido"
            });
        }
    }
    else {
        res.json({
            error: "La información no es válida"
        });
    }
});
exports.login = login;
var update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield typeorm_1.getRepository(User_entity_1.User).findOne({ id: req.headers["x-access-token"].split("|")[1] });
    if (user) {
        for (let i in req.body) {
            user[i] = req.body[i];
        }
        if (req.file) {
            fs_1.default.unlinkSync(path_1.default.join(__dirname, "../uploads/" + user.image));
            user.image = req.file.filename;
        }
        if (user) {
            const userUpdate = yield typeorm_1.getRepository(User_entity_1.User).update({ id: user.id }, user);
            res.json(userUpdate);
        }
        else {
            res.json({
                error: "Ocurrió un error al actualizar el usuario"
            });
        }
    }
    else {
        res.json({
            error: "El usuario no es válido"
        });
    }
});
exports.update = update;
