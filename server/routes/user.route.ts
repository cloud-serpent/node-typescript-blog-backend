import express from 'express';
import { userController } from 'controllers';

const userRouter = express.Router();

userRouter.post("/",
    userController.registerValidator(),
    userController.register
)

export default userRouter;