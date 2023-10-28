import { Request, Response } from "express";
import { body, param } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService} from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const commentReadValidator = () => {
    return [
        param("postId")
            .notEmpty()
            .withMessage({ postId: "PostID is required" })
    ];
};

type Params = {
    postId: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const commentReadHandler = async (
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { postId } = req.params;

    const result = await postService.readCom(
        postId
    );
    res.status(httpStatus.OK).json(result);
};

export const commentRead = errorHandlerWrapper(commentReadHandler);