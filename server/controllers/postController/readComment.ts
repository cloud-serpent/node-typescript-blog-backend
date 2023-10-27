import { Request, Response } from "express";
import { body } from "express-validator";
import httpStatus from "http-status";
import { MESSAGES } from "consts";
import { postService} from "services";
import { ArgumentValidationError } from "errors";
import { errorHandlerWrapper } from "utils/errorHandler.wrapper";
import { AuthRequest } from "types";

export const commentReadValidator = () => {
    return [
        body("post_id")
            .notEmpty()
            .withMessage({ post_id: "Post_ID is required" })
    ];
};

type Params = {
    post_id: number;
};
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const commentReadHandler = async (
    req: AuthRequest<Params, ResBody, ReqBody, ReqQuery>,
    res: Response
) => {
    const { post_id } = req.params;

    const result = await postService.readCom(
        post_id
    );
    res.status(httpStatus.OK).json(result);
};

export const commentRead = errorHandlerWrapper(commentReadHandler);