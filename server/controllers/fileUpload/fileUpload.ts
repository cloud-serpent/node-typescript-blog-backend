import { Request, Response } from "express";
import httpStatus from "http-status";
import path from "path";
import { errorHandlerWrapper } from "utils";

export const fileLoadValidator = () => {
  console.log("uploaded")
    return [];
};

type Params = unknown;
type ResBody = unknown;
type ReqBody = unknown;
type ReqQuery = unknown;

export const fileLoadHandler = async (
  req: any,
  res: Response
) => {
    let uploadFile:any = req.files.avatar;
    console.log(req.files);
    const name = uploadFile.name;
    const md5 = uploadFile.md5;
    // const saveAs = `${md5}_${name}`;
    const date = new Date(Date.now());
    const saveAs = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${uploadFile.name}`;
    // console.log(name);
    await uploadFile.mv(`${path.join(__dirname, '../../../','public/upload/img/')}${saveAs}`, function(err) {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
      return res.status(httpStatus.OK).json({ status: 'uploaded', name, saveAs });
    });
};

export const fileLoad = errorHandlerWrapper(fileLoadHandler);
