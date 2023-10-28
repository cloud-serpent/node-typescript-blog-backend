import { Request, Response } from "express";
import { body, param, query } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const postGetUserValidator = () => {
  return [
    query('page').notEmpty().withMessage({page:'Page number is required'}),
    query('listnum').notEmpty().withMessage({page:'List counts is required'})
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;

type ReqQuery = {
    page: number;
    listnum: number;
};

export const postGetUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const user_id = req.user.id;
  const {page, listnum} = req.query;

  const result = await postService.getPostUser(user_id);
  res.status(httpStatus.OK).json(result.slice(listnum*(page-1), listnum*page));
};

export const postGetUser = errorHandlerWrapper(postGetUserHandler);
