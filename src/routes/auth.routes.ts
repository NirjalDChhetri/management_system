import { Router } from "express";
import Validator from "../middlewares/Request.Validator";
import { ChangePasswordDTO, LoginDTO } from "../dtos/login.dto";
import { catchAsync } from "../utils/catchAsync";
import authController from "../controllers/auth.controller";
import authentication from "../middlewares/authentication.middleware";
import { User } from "../entities/user.entity";
import { Role } from "../constant/enum";

const router = Router();

router.post(
  "/admin/login",
  Validator.validate(LoginDTO),
  catchAsync(authController.adminLogin)
);
router.post(
  "/user/login",
  Validator.validate(LoginDTO),
  catchAsync(authController.userLogin)
);
router.post(
  "/change-password",
  authentication,
  Validator.validate(ChangePasswordDTO),
  catchAsync(authController.changePassword)
);

export default router;
