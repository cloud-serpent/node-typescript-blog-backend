import express from "express";

import testRouter from "./test.route";
import userRouter from "./user.route";
import fileRouter from "./file.route";

const appRoutes = express.Router();

appRoutes.use("/test", testRouter);
appRoutes.use("/users", userRouter);
appRoutes.use("/upload", fileRouter);

export default appRoutes;
