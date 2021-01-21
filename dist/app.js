"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const lik_routes_1 = __importDefault(require("./routes/lik.routes"));
var config = (app) => {
    // Port
    app.set("port", process.env.PORT || 6000);
    // Middlewares
    app.use(morgan_1.default("dev"));
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    // Routes
    app.use(user_routes_1.default);
    app.use(post_routes_1.default);
    app.use(lik_routes_1.default);
    return app;
};
exports.default = config;
