import { authController } from "controllers";
import express from "express";

const authRouter = express.Router();

// User Log In
authRouter.post(
  "log-in",
  authController.logInValidator(),
  authController.logIn
);

export default authRouter;
