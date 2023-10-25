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
    body("phone_number")
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
  phone_number?: string;
  password: string;
};
type ReqQuery = unknown;

export const logInHandler = async (
  req: Request<Params, ResBody, ReqBody, ReqQuery>,
  res: Response
) => {
  const { email, phone_number, password } = req.body;

  if (!email && !phone_number) {
    throw new ArgumentValidationError("Invalid Arguments", [
      { id: "Email or phone number is required" },
    ]);
  }

  if (email && phone_number) {
    throw new ArgumentValidationError("Invalid Arguments", [
      { id: "Only one of email or phone number is required" },
    ]);
  }

  const user = email
    ? await userService.getUserByEmail({ email })
    : await userService.getUserByEmail({ phone_number });
  Logger.log(user);
  if (!user) {
    throw new ArgumentValidationError("Invalid Arguments", [
      { id: "Email or phone number is incorrect!" },
    ]);
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
