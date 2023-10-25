import express from "express";

import testRouter from "./test.route";
import authRouter from "./auth.router";

const appRoutes = express.Router();

appRoutes.use("/test", testRouter);
appRoutes.use("/auth", authRouter);

export default appRoutes;
