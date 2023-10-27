import { PostEntity } from "entities";
import { getPostRepository } from "utils";

export const getPostUser = async (
  user_id: number
): Promise<PostEntity[] | null> => {
  const postRepository = await getPostRepository();
//   const postUser: PostEntity[] | null = await postRepository
//     .createQueryBuilder("post")
//     .select()
//     .where({user_id:user_id})
    // .getMany();
const postUser: PostEntity[] | null = await postRepository.find({
    where: {
        user_id:user_id
    }
})
  return postUser.reverse();
};

export const getAllPost = async () : Promise<PostEntity[]|null> => {
  const postRepository = await getPostRepository();
  const postUser: PostEntity[] | null = await postRepository.find();
  console.log(postUser)
  return postUser.reverse();
}

export const createPost = async (
  title: string,
  body: string,
  user_id: number,
  attachments?: string,
): Promise<PostEntity | null> => {
  const postRepository = await getPostRepository();
  const post = new PostEntity();
  post.title = title;
  post.body = body;
  post.user_id = user_id;
  post.attachments = attachments;
  await postRepository.save(post);
  return post;
};

export const updatePost = async (
  data: { id: number } & Partial<
    Pick<PostEntity, "title" | "body" | "attachments">
  >
): Promise<PostEntity | null> => {
  const postRepository = await getPostRepository();

  const post_update: PostEntity | null = await postRepository.findOneBy({
    id: data.id,
  });

  post_update.title = data.title ? data.title : post_update.title;
  post_update.body = data.body ? data.body : post_update.body;
  post_update.attachments = data.attachments
    ? data.attachments
    : post_update.attachments;

  await postRepository.save(post_update);
  return post_update;
};

export const deletePost = async( id:number ) : Promise<Boolean> => {
    const postRepository = await getPostRepository();

    const post = await postRepository.delete({
        id:id
    });
    return post.affected ? true : false
}