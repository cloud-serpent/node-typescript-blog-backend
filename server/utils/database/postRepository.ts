import { DBConnect } from '../dbConnector';

import { PostEntity} from 'entities';

export const getPostRepository = async () => {
  const connection = await DBConnect.getConnection();

  return connection.getRepository(PostEntity);
};
