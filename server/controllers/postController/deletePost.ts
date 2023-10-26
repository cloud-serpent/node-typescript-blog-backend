import { Request, Response } from "express";
import { body, param } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const postDeleteValidator = () => {
  return [
    param('id').notEmpty().withMessage({id:'Id of post should be deleted is required'})
  ];
};

type Params = {
    id:number
};
type ResBody = unknown;
type ReqBody = unknown;

type ReqQuery = unknown;

export const postDeleteHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { id } = req.params;

  const result = await postService.deletePost(id);
  res.status(httpStatus.OK).json(result);
};

export const postDelete = errorHandlerWrapper(postDeleteHandler);
