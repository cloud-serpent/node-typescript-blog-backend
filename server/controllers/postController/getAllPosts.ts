import { Request, Response } from 'express';
import { body, param } from "express-validator";
import httpStatus from 'http-status';
import { MESSAGES } from 'consts';
import { postService } from 'services';
import { ArgumentValidationError } from 'errors';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { AuthRequest } from 'types';

export const getAllPostValidator = () => {
    return [
        param('page')
            .notEmpty()
            .withMessage({ page: 'Page number is required' }),
        param('listnum')
            .notEmpty()
            .withMessage({ page: 'List counts is required' })
    ];
};

type Params = {
    page: number;
    listnum: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const getAllPostHandler = async(
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { page, listnum } = req.params;

    const result = await postService.getAllPost();
    res.status(httpStatus.OK).json(result.slice(listnum*(page-1), listnum*page));
}

export const postAll = errorHandlerWrapper(getAllPostHandler);