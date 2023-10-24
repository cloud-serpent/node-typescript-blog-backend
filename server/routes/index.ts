import express from "express";

import testRouter from "./test.route";
import userRouter from "./user.route";

const appRoutes = express.Router();

appRoutes.use("/test", testRouter);
appRoutes.use("/users", userRouter);

export default appRoutes;
