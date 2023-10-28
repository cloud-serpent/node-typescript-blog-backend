import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { userService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { Logger, encryptPassword } from "utils";
import { AuthRequest } from "types";

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email?: string;
  displayName?: string;
  phoneNumber?: string;
  countryCode?: string;
  password: string;
};
type ReqQuery = unknown;

export const getUserHandler = async (
  req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email } = req.user;
  const user = await userService.getUser({ email });
  res.status(httpStatus.OK).json(user);
};

export const getUser = errorHandlerWrapper(getUserHandler);
