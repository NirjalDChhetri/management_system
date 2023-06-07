import express from "express";
import { AppDataSource } from "./config/database.config";
import DotenvConfig from "./config/env.config";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes)

app.listen(DotenvConfig.PORT, () => {
  console.log(`Server has started ${DotenvConfig.PORT} 🚀`);

  AppDataSource.initialize()
    .then(() => {
      console.log("Database Connected Successfully🚀!");
    })
    .catch((error) => {
      console.error("Database connection error", error);
    });
});
