import dotenv from "dotenv";
dotenv.config();
import express from "express";
import config from "./app";
import database from "./database";

const app = config(express());

database();
console.log("Connect to a database");

app.listen(app.get("port"), (pepe) => console.log("Connect to port " + app.get("port")))