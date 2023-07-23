import { Router } from "express";
import { catchAsync } from "../utils/catchAsync";
import userController from "../controllers/user.controller";
import RequestValidator from "../middlewares/Request.Validator";
import { UserDTO } from "../dtos/user.dto";

const router = Router();

router.post(
  "/signup",
  RequestValidator.validate(UserDTO),
  catchAsync(userController.signup)
);

export default router;
