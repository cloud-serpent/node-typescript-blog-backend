import { Response } from 'express';
import httpStatus from "http-status";
import jwt from 'jsonwebtoken';

import { JWT_TOKEN } from 'config';
import { MESSAGES, REASON_CODE } from "consts";

import { NotFoundError } from "errors";
import { userService } from 'services';
import { Logger } from "utils/logger";

export const checkToken = async (
    req: any,
    res: Response,
    next: Function
) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        Logger.log('token:', token);
        Logger.log('!!token:', !!token);
        if (token === 'Bearer') {
            throw new NotFoundError('Unauthorized', REASON_CODE.AUTH.UNAUTHORIZED);
        }
        const data: any = jwt.verify(token, JWT_TOKEN);
        const user = await userService.getUser({email:data.email});

        req.user = user;

        next();
    } catch (error) {
        Logger.log(error)
        if(error instanceof NotFoundError) {
            res.status(error.errorCode).json({
                message: error.message,
                reason: error.reasonCode
            });
        }else {
            res.status(httpStatus.UNAUTHORIZED).json({
                message: MESSAGES.UNAUTHORIZED,
                reason: REASON_CODE.AUTH.UNAUTHORIZED
            });
        }
    }
};