import morgan from "morgan";
import express from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import likRoutes from "./routes/lik.routes";

var config = (app) => {

    // Port
    app.set("port", process.env.PORT || 6000);
    
    // Middlewares
    app.use(morgan("dev"));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // Routes
    app.use(userRoutes);
    app.use(postRoutes);
    app.use(likRoutes);

    return app;
}

export default config