import { CommentDB } from "../models/Comments";
import {  POST_LIKE, PostsDB, PostsDBAmount, likeDeslikeDB } from "../models/Post";

import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {
  public static TABLE_POST = "posts";
  public static TABLE_COMMENT = "comments";
  public static TABLE_COMMENT_AMOUNT = "comments_amount";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public async insertPost(newPost: PostsDB) {
    await BaseDatabase.connection(PostsDatabase.TABLE_POST).insert(newPost);
  }
  public async insertComment(newPost: CommentDB) {
    await BaseDatabase.connection(PostsDatabase.TABLE_COMMENT).insert(newPost);
  }

  public async getPosts(): Promise<PostsDBAmount[]> {
    const data: PostsDBAmount[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POST
    );
    return data;
  }
  public async getComments(idToEdit: string): Promise<CommentDB[]> {
    const data: CommentDB[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_COMMENT
    ).where({ post_id: idToEdit });
    return data;
  }

  

  public async updatePost(postsDB: PostsDB) {
    await BaseDatabase.connection(PostsDatabase.TABLE_POST)
      .update(postsDB)
      .where({ id: postsDB.id });
  }

  public async findPostById(idToEdit: string): Promise<PostsDBAmount |undefined > {
    const postsDB: PostsDBAmount[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POST
    ).where({ id: idToEdit });

    const postDB: PostsDBAmount | undefined = postsDB[0];

    return postDB;
  }
  public async findPostByIdAmount(idToEdit: string): Promise<PostsDBAmount | undefined > {
    const postsDB: PostsDBAmount[] = await BaseDatabase.connection(
      PostsDatabase.TABLE_POST
    ).where({ id: idToEdit });

    const postDB: PostsDBAmount | undefined = postsDB[0];

    return postDB;
  }

  public async deletePostById(idToDelete: string) {
    await BaseDatabase.connection(PostsDatabase.TABLE_POST)
      .delete()
      .where({ id: idToDelete });
  }

  public findLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<POST_LIKE | undefined> => {
    const [result]: Array<likeDeslikeDB | undefined> =
      await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES)
        .select()
        .where({
          user_id: likeDislikeDB.user_id,
          post_id: likeDislikeDB.post_id,
        });

    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  };
 

  public removeLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };

  public updateLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };
  public updateAmountComment = async (
    postId: string,
    newAmountComments: number
  ): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_POST)
      .where({ id: postId })
      .update({ amount_comments: newAmountComments});
  };

  public insertLikeDislike = async (
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostsDatabase.TABLE_LIKES_DISLIKES).insert(
      likeDislikeDB
    );
  };
  
}
