import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { userService } from "services";
import { Logger, errorHandlerWrapper } from "utils";
import { ArgumentValidationError, CustomError } from "errors";
import { comparePassword } from "utils/password";
import { jwtSign } from "utils/jwt";
import { REASON_CODE } from "consts";

export const logInValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Email is not correct."),
    body("phone")
      .optional()
      .isMobilePhone("any")
      .withMessage("Phone number is not correct"),
    body("password").notEmpty().withMessage("Password is required."),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email?: string;
  phone?: string;
  password: string;
};
type ReqQuery = unknown;

export const logInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    throw new ArgumentValidationError("Invalid Arguments", [
      "Email or phone number is required",
    ]);
  }

  if (email && phone) {
    throw new ArgumentValidationError("Invalid Arguments", [
      "Only one of email or phone number is required",
    ]);
  }

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

export const login = errorHandlerWrapper(logInHandler);
