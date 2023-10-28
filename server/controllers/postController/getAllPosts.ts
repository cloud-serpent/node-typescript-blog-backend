import { Request, Response } from 'express';
import { body, param, query } from "express-validator";
import httpStatus from 'http-status';
import { MESSAGES } from 'consts';
import { postService } from 'services';
import { ArgumentValidationError } from 'errors';
import { errorHandlerWrapper } from 'utils/errorHandler.wrapper';
import { AuthRequest } from 'types';

export const getAllPostValidator = () => {
    return [
        query('page')
            .notEmpty()
            .withMessage({ page: 'Page number is required' }),
        query('listNum')
            .notEmpty()
            .withMessage({ page: 'List counts is required' })
    ];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = {
    page: number;
    listNum: number;
};

export const getAllPostHandler = async(
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { page, listNum } = req.query;

    const result = await postService.getAllPost();
    res.status(httpStatus.OK).json(result.slice(listNum*(page-1), listNum*page));
}

export const postAll = errorHandlerWrapper(getAllPostHandler);