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
    query('listNum').notEmpty().withMessage({page:'List counts is required'})
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;

type ReqQuery = {
  page: number;
  listNum: number;
};

export const postGetUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const user_id = req.user.id;
  const {page, listNum} = req.query;

  const result = await postService.getPostUser(user_id);
  res.status(httpStatus.OK).json({posts: result.slice(listNum*(page-1), listNum*page), total: Math.ceil(result.length / listNum)});
};

export const postGetUser = errorHandlerWrapper(postGetUserHandler);
