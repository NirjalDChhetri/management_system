import { Router } from "express";
import messages from "../constant/messages";
import authRoutes from "./auth.routes";

export type Route = {
  path: string;
  route: Router;
};

const router = Router();

const routes: Route[] = [
  {
    path:'/auth',
    route: authRoutes,
  }
];

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