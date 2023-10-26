import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const postGetUserValidator = () => {
  return [];
};

type Params = {
    page: number;
    listnum: number;
};
type ResBody = unknown;
type ReqBody = unknown;

type ReqQuery = unknown;

export const postGetUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const user_id = req.user.id;
  const {page, listnum} = req.params;

  const result = await postService.getPostUser(user_id);
  res.status(httpStatus.OK).json(result);
};

export const postGetUser = errorHandlerWrapper(postGetUserHandler);
