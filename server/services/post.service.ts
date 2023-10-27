import { CommentEntity, PostEntity } from "entities";
import { getPostRepository, getCommentRepository } from "utils";

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
  //console.log(postUser)
  return postUser.reverse();
}

export const getPost = async (
  id: number
): Promise<PostEntity[] | null> => {
  const postRepository = await getPostRepository();
  const certainPost: PostEntity[] | null = await postRepository.find({
    where: {
      id : id
    }
  })
  return certainPost;
}

export const createCom = async(
  post_id: number,
  user_id: number,
  body: string
): Promise<CommentEntity | null> => {
  const commentRepository = await getCommentRepository();
  const comment = new CommentEntity();
  comment.post_id = post_id;
  comment.user_id = user_id;
  comment.body = body;
  await commentRepository.save(comment);
  return comment;
}

export const readCom = async (
  post_id: number
): Promise<CommentEntity[] | null> => {
  const commentRepository = await getCommentRepository();
  const comment: CommentEntity[] | null = await commentRepository.find({
    where: {
      post_id: post_id
    }
  });
  return comment.reverse();
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