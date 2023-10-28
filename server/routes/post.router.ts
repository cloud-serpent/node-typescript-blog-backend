import { postController } from "controllers";
import express from "express";
import { checkToken } from "utils/auth";

const postRouter = express.Router();

postRouter.post(
  "/post",
  checkToken,
  postController.postCreateValidator(),
  postController.postCreate
);

postRouter.put(
  "/post",
  checkToken,
  postController.postUpdateValidator(),
  postController.postUpdate
);

postRouter.get(
  "/post/user",
  checkToken,
  postController.postGetUserValidator(),
  postController.postGetUser
);

postRouter.delete(
  "/post/:id",
  checkToken,
  postController.postDeleteValidator(),
  postController.postDelete
);

export default postRouter;
