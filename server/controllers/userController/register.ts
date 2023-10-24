import {Request, Response} from 'express';
import {body} from 'express-validator';
import httpStatus from 'http-status';
import { MESSAGES } from 'consts';
import { userService } from 'services';
import { ArgumentValidationError, CustomError } from 'errors';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { Logger, encryptPassword } from 'utils';

export const registerValidator = () => {
    console.log("registered");
    return[
        body('email')
            .notEmpty()
            .withMessage({email: 'Email is required'})
            .bail()
            .isEmail()
            .withMessage({email: 'Email is incorrect'}),
        body('first_name')
            .notEmpty()
            .withMessage({first_name: 'First name is required'}),
        body('last_name')
            .notEmpty()
            .withMessage({first_name: 'Last name is required'}),
        body('password1')
            .notEmpty()
            .withMessage({password: 'Password is required'}),
        body('password2')
            .notEmpty()
            .withMessage({password: 'Confirm password is required'}),
    ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = {
    email?: string;
    first_name?: string;
    last_name?: string;
    password1: string;
    password2: string;
}
type ReqQuery = unknown;

export const registerHandler =async (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const {email, first_name, last_name, password1, password2} = req.body;
    if(password1 != password2){
        throw new ArgumentValidationError(
            "Confirm password is incorrect!",
            [{ password2: "Confirm password is incorrect" }],
            MESSAGES.PASSWORD_NOT_CORRECT
        )
    }
    const user = await userService.getUserByEmail(email);
    Logger.log(user);
    if (user) {
        throw new ArgumentValidationError(
          `${email} is already registered. Please sign in or change another email address`,
          [{ email: `${email} is already registered. Please sign in or change another email address` }],
          MESSAGES.DUPLICATED_ACCOUNT
        );
    }
    const cryptPassword = await encryptPassword(password1);
    const result = await userService.createUser(email, first_name, last_name, cryptPassword);
    res.status(httpStatus.OK).json(result);
}

export const register = errorHandlerWrapper(registerHandler);