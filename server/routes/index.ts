import express from "express";

import testRouter from "./test.route";
import userRouter from "./user.route";
import fileRouter from "./file.route";
import authRouter from "./auth.router";
import postRouter from "./post.router";

const appRoutes = express.Router();

appRoutes.use("/test", testRouter);
appRoutes.use("/users", userRouter);
appRoutes.use("/upload", fileRouter);
appRoutes.use("/auth", authRouter);
appRoutes.use("/posts", postRouter);

export default appRoutes;
