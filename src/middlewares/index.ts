import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import routes from "../routes/index";

const middlewares = (app: Application) => {
  app.use(compression());

  app.use(cors());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1", routes);
};

export default middlewares;
