import express from 'express';
import { userController } from 'controllers';
import { checkToken } from 'utils/auth';

const userRouter = express.Router();

userRouter.post("/",
    userController.registerValidator(),
    userController.register
)

userRouter.get("/me",
    checkToken,
    userController.getUser
)

export default userRouter;