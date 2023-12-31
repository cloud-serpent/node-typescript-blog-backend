import { DBConnect } from "../dbConnector";

import { CommentEntity } from "entities";

export const getCommentRepository = async () => {
    const connection = await DBConnect.getConnection();

    return connection.getRepository(CommentEntity);
}