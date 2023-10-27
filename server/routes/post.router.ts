import { postController } from "controllers";
import express from "express";
import { checkToken } from "utils/auth";

const postRouter = express.Router();

postRouter.post(
  "/",
  checkToken,
  postController.postCreateValidator(),
  postController.postCreate
);

postRouter.put(
  "/",
  checkToken,
  postController.postUpdateValidator(),
  postController.postUpdate
);

postRouter.get(
  "/:page/:listnum",
  checkToken,
  postController.postGetUserValidator(),
  postController.postGetUser
);

postRouter.delete(
  "/:id",
  checkToken,
  postController.postDeleteValidator(),
  postController.postDelete
);

export default postRouter;
