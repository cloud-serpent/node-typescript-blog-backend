import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";

import { CustomError } from "errors";

import { userService } from "services";
import { Logger, errorHandlerWrapper } from "utils";
import { REASON_CODE } from "consts";
import { comparePassword } from "utils/password";
import { jwtSign } from "utils/jwt";

export const logInValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is not correct."),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email?: string;
  password: string;
};
type ReqQuery = unknown;

export const logInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);
  Logger.log(user);
  if (!user) {
    throw new CustomError(
      "User does not exist!",
      httpStatus.BAD_REQUEST,
      REASON_CODE.AUTH.USER_IS_NOT_EXIST
    );
  }

  const pwd = await userService.getPassword(email);

  const compare = await comparePassword(password, pwd.password);
  if (!compare) {
    throw new CustomError(
      "Password is incorrect!",
      httpStatus.BAD_REQUEST,
      REASON_CODE.AUTH.PASSWORD_INCORRECT
    );
  }
  const token = jwtSign(user);
  res.status(httpStatus.OK).json({ user: user, token: token });
};

export const logIn = errorHandlerWrapper(logInHandler);
