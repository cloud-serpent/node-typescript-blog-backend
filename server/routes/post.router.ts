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

postRouter.get(
  "/all/:page/:listnum",
  checkToken,
  postController.getAllPostValidator(),
  postController.postAll
)

postRouter.get(
  "/:id",
  checkToken,
  postController.getCertainValidator(),
  postController.postCertain
)

postRouter.post(
  "/comment/:post_id",
  checkToken,
  postController.commentCreateValidator(),
  postController.commentCreate
)

postRouter.get(
  "/comment/:post_id",
  checkToken,
  postController.commentReadValidator(),
  postController.commentRead
)

export default postRouter;
