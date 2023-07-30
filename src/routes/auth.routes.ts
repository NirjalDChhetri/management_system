import { Router } from "express";
import Validator from "../middlewares/Request.Validator";
import { LoginDTO } from "../dtos/login.dto";
import { catchAsync } from "../utils/catchAsync";
import authController from "../controllers/auth.controller";

const router = Router();

router.post("/admin/login", Validator.validate(LoginDTO), catchAsync(authController.adminLogin));

export default router;
