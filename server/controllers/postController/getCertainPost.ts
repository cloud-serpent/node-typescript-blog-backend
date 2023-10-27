import { Request, Response } from "express";
import { body, param } from 'express-validator';
import httpStatus from "http-status";
import { MESSAGES } from 'consts';
import { postService } from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils";
import { AuthRequest } from "types";

export const getCertainValidator = () => {
    return [
        param('id')
            .notEmpty()
            .withMessage({ id: 'ID is required' })
    ];
};

type Params = {
    id: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getCentainPostHandler = async(
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { id } = req.params;

    const result = await postService.getCertainPost();
    res.status(httpStatus.OK).json(result);
}

export const postCertain = errorHandlerWrapper(getCentainPostHandler);