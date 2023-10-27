import { Request, Response } from "express";
import { body, param } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService} from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const commentCreateValidator = () => {
    return [
        body("post_id")
            .notEmpty()
            .withMessage({ post_id: "Post_ID is required" }),
        body("user_id")
            .notEmpty()
            .withMessage({ user_id: "User_ID is required" })
    ];
};

type Params = unknown
type ResBody = unknown;
type ReqBody = {
    post_id: number;
    user_id: number;
    body: string;
};
type ReqQuery = unknown;

export const createCommentHandler = async (
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { post_id, user_id, body } = req.body;

    const result = await postService.createCom(
        post_id,
        user_id,
        body
    );
    res.status(httpStatus.OK).json(result);
};

export const commentCreate = errorHandlerWrapper(createCommentHandler);