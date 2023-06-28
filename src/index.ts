import { AppDataSource } from "./config/database.config";
import DotenvConfig from "./config/env.config";
import app from "./config/app";

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
