import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService} from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const postCreateValidator = () => {
  return [
    body("title")
      .notEmpty()
      .withMessage({ title: "Title is required" }),
    body("body")
      .notEmpty()
      .withMessage({ post: "Post is required" }),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
    title: string,
    body: string,
    user_id: number,
    attachments?:string
};

type ReqQuery = unknown;

export const postCreateHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { title, body, user_id, attachments } = req.body;

  const result = await postService.createPost(
    title,
    body,
    user_id,
    attachments
  );
  res.status(httpStatus.OK).json(result);
};

export const postCreate = errorHandlerWrapper(postCreateHandler);
