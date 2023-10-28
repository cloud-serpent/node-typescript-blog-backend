import { Request, Response } from "express";
import { body, param } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const postGetUserValidator = () => {
  return [
    param('page').notEmpty().withMessage({page:'Page number is required'}),
    param('listnum').notEmpty().withMessage({page:'List counts is required'})
  ];
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
  res.status(httpStatus.OK).json({posts: result.slice(listnum*(page-1), listnum*page), total: Math.ceil(result.length / listnum)});
};

export const postGetUser = errorHandlerWrapper(postGetUserHandler);
