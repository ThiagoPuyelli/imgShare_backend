import morgan from "morgan";
import express from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import likRoutes from "./routes/lik.routes";
import configCloudinary from "./middlewares/cloudinary";

var config = (app) => {

    // Port
    app.set("port", process.env.PORT || 7000);
    
    // Middlewares
    app.use(morgan("dev"));
    configCloudinary;
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    // Cors
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });
    

    // Routes
    app.use(userRoutes);
    app.use(postRoutes);
    app.use(likRoutes);

    return app;
}

export default config