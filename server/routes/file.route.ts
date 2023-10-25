import express from 'express';
import { fileUploadController } from 'controllers';

const fileRouter = express.Router();

fileRouter.post("/",
    fileUploadController.fileLoadValidator(),
    fileUploadController.fileLoad
)

export default fileRouter;