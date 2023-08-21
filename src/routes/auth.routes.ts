import { Router } from "express";
import Validator from "../middlewares/Request.Validator";
import { ChangePasswordDTO, ForgotPasswordDTO, LoginDTO, ResetPasswordDTO, } from "../dtos/login.dto";
import { catchAsync } from "../utils/catchAsync";
import authController from "../controllers/auth.controller";
import authentication from "../middlewares/authentication.middleware";

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

router.post(
  "/forgot-password",
  Validator.validate(ForgotPasswordDTO),
  catchAsync(authController.forgotPassword)
);

router.post(
  "/reset-password",
  Validator.validate(ResetPasswordDTO),
  catchAsync(authController.resetPassword)
);

export default router;
