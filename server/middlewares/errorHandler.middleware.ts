import { AxiosError } from 'axios';
import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";

import { ArgumentValidationError, CustomError } from "errors";

import { Logger } from "utils";

export const errorHandlerMiddleware = (
	error: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	Logger.log(error);

	if (error instanceof CustomError) {
		if (error instanceof ArgumentValidationError) {
			res.status(error.errorCode).json({
				message: error.messages,
				reason: error.reasonCode,
			});
		} else {
			res.status(error.errorCode).json({
				message: error.message,
				reason: error.reasonCode,
			});
		}
		return;
	}

	if (error instanceof AxiosError) {
		console.log('ssss')
		return res.status(error.response.status).json({
		  message: error.response.statusText,
		});
	  }

	res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
		message: (error as Error).message,
	});
};
