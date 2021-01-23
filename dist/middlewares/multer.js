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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = __importDefault(require("uuid"));
const fs_1 = __importDefault(require("fs"));
const generatedStorage = () => {
    return multer_1.default.diskStorage({
        destination(req, file, cb) {
            cb(null, path_1.default.join(__dirname, "../uploads"));
        },
        filename(req, file, cb) {
            return __awaiter(this, void 0, void 0, function* () {
                const { originalname } = file;
                const originalnameSplit = originalname.split("|");
                const fileExt = originalnameSplit[originalnameSplit.length - 1];
                const filename = uuid_1.v4() + "." + fileExt;
                yield fs_1.default.stat(path_1.default.join(__dirname, "../uploads/" + filename), (err, image) => {
                    if (image) {
                        generatedStorage();
                    }
                    else {
                        console.log(err);
                    }
                });
                cb(null, filename);
            });
        }
    });
};
const storage = generatedStorage();
exports.default = multer_1.default({
    storage,
    fileFilter(req, file, next) {
        const image = file.mimetype.startsWith("image/");
        if (image) {
            next(null, true);
        }
        else {
            next(null, false);
        }
    }
});
