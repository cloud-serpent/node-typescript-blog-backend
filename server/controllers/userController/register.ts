import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { userService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { Logger, encryptPassword } from "utils";

export const registerValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage({ email: "Email is required" })
      .bail()
      .isEmail()
      .withMessage({ email: "Email is incorrect" }),
    body("displayName")
      .notEmpty()
      .withMessage({ displayName: "Display name is required" }),
    body("phoneNumber")
      .notEmpty()
      .withMessage({ phoneNumber: "Phone number is required" }),
    body("countryCode")
      .notEmpty()
      .withMessage({ countryCode: "Country code is required" }),
    body("password")
      .notEmpty()
      .withMessage({ password: "Password is required" }),
  ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
  email?: string;
  display_name?: string;
  phoneNumber?: string;
  country_code?: string;
  password: string;
};
type IFile = {
  url: string;
  name: string;
};
type ReqQuery = unknown;

export const registerHandler = async (
  req: Request<Params, ResBody, ReqBody, IFile, ReqQuery>,
  res: Response
) => {
  const { email, display_name, phoneNumber, country_code, password } = req.body;
  const user = await userService.getUser({ email });
  Logger.log(user);
  if (user) {
    throw new ArgumentValidationError(
      `${email} is already registered. Please sign in or change another email address`,
      [
        {
          email: `${email} is already registered. Please sign in or change another email address`,
        },
      ],
      MESSAGES.DUPLICATED_ACCOUNT
    );
  }

  const phone = await userService.getUser({ phoneNumber });
  Logger.log(phone);
  if (phoneNumber) {
    throw new ArgumentValidationError(
      `${phoneNumber} is already registered. Please sign in or change another phone number`,
      [
        {
          phoneNumber: `${phoneNumber} is already registered. Please sign in or change another phone number`,
        },
      ],
      MESSAGES.DUPLICATED_ACCOUNT
    );
  }
  const cryptPassword = await encryptPassword(password);
  const result = await userService.createUser(
    display_name,
    country_code,
    phoneNumber,
    email,
    cryptPassword
  );
  res.status(httpStatus.OK).json(result);
};

export const register = errorHandlerWrapper(registerHandler);
