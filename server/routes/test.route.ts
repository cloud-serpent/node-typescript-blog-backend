import express from "express";

import { testController } from "controllers";
import userRouter from "./user.route";

const testRouter = express.Router();

// Create Test
testRouter.get("/", testController.getTestValidator(), testController.getTest);
testRouter.use('/users', userRouter);
export default testRouter;
