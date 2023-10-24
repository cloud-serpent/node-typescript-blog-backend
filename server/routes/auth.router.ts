import { authController } from "controllers";
import express from "express";

const authRouter = express.Router();

// User Log In
authRouter.post(
  "/login",
  authController.logInValidator(),
  authController.login
);

export default authRouter;
