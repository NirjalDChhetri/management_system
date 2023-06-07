import { Router } from "express";
import messages from "../constant/messages";

export type Route = {
  path: string;
  route: Router;
};

const router = Router();

const routes: Route[] = [];

//*Instantiate all the routes
routes.forEach((route) => {
  router.use(route.path, route.route);
});

//Route to ensure that server is currently running
router.get("/", (req, res) => {
  res.send({
    success: true,
    message: messages["welcomeMessage"],
    data: [],
  });
});

export default router;