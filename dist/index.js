"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./database"));
const app = app_1.default(express_1.default());
database_1.default();
console.log("Connect to a database");
app.listen(app.get("port"), (pepe) => console.log("Connect to port " + app.get("port")));
