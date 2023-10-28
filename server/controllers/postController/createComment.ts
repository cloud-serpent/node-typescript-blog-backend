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
        body("postId")
            .notEmpty()
            .withMessage({ postId: "Post_ID is required" }),
        body("userId")
            .notEmpty()
            .withMessage({ userId: "User_ID is required" })
    ];
};

type Params = unknown
type ResBody = unknown;
type ReqBody = {
    postId: number;
    userId: number;
    body: string;
};
type ReqQuery = unknown;

export const createCommentHandler = async (
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { postId, userId, body } = req.body;

    const result = await postService.createCom(
        postId,
        userId,
        body
    );
    res.status(httpStatus.OK).json(result);
};

export const commentCreate = errorHandlerWrapper(createCommentHandler);