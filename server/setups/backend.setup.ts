import { json as bodyParserJSON } from "body-parser";
import cors from "cors";
import "dotenv/config";
import express, { Express } from "express";
import fileUpload from 'express-fileupload';

import { ROUTE_VERSION } from "config";

import { MESSAGES } from "consts";

import { errorHandlerMiddleware, requestLoggerMiddleware } from "middlewares";

import appRoutes from "routes";

const port = process.env.PORT || 8000;

const backendSetup = (app: Express) => {
  app.use(express.json());
  app.use(cors());
  app.use(bodyParserJSON());

  app.use(requestLoggerMiddleware);

  // Health check
  app.use("/health", function (_req, res) {
    res.send("OK");
  });

  app.use(fileUpload({
    createParentPath: true,
    abortOnLimit: true,
    // limits: {fileSize: 1000*1024*1024},
    useTempFiles: true, 
    tempFileDir: '/tmp/',
    safeFileNames: true,
    preserveExtension: true
  }));


  app.use(`/api/${ROUTE_VERSION}`, appRoutes);

  app.use(errorHandlerMiddleware);

  app.listen(port, () => {
    console.info(`${MESSAGES.SERVER_RUN_SUCCESS} on PORT: ${port}`);
  });
};

export default backendSetup;
