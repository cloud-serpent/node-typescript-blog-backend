import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";

export const postUpdateValidator = () => {
  return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  id: number;
  title?: string;
  body?: string;
  user_id: number;
  attachments?: string;
};

type ReqQuery = unknown;

export const postUpdateHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { id, title, body, user_id, attachments } = req.body;

  const result = await postService.updatePost({ id, title, body, attachments });
  res.status(httpStatus.OK).json(result);
};

export const postUpdate = errorHandlerWrapper(postUpdateHandler);
