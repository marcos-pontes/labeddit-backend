import { likeDeslikeDB } from "../../src/models/Post";
import { POST_LIKE, PostsDB, PostsDBAmount } from "../../src/models/Post";
import { BaseDatabase } from "../../src/database/BaseDatabase";
import { CommentDB } from "../../src/models/Comments";

const postsMock: PostsDBAmount[] = [
  {
    id: "id-mock-post-1",
    creator_id: "id-mock-fulano",
    content: "Este é o post 1",
    likes: 5,
    dislikes: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    amount_comments: 0,
  },
  {
    id: "id-mock-post-2",
    creator_id: "id-mock-astrodev",
    content: "Este é o post 2",
    likes: 10,
    dislikes: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    amount_comments: 1,
  },
];

const likesDislikesMock: likeDeslikeDB[] = [
  {
    user_id: "id-mock-fulano",
    post_id: "id-mock-post-1",
    like: 1,
  },
  {
    user_id: "id-mock-astrodev",
    post_id: "id-mock-post-1",
    like: 0,
  },
  {
    user_id: "id-mock-fulano",
    post_id: "id-mock-post-2",
    like: 1,
  },
];

const commentsMock: CommentDB[] = [
  {
    id: "comment-id-1",
    post_id: "id-mock-post-1",
    creator_id: "id-mock-astrodev",
    content: "Este é o comentário 1",
    likes: 10,
    dislikes: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "comment-id-2",
    post_id: "id-mock-post-1",
    creator_id: "id-mock-fulano",
    content: "Este é o comentário 2",
    likes: 1,
    dislikes: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "comment-id-3",
    post_id: "id-mock-post-1",
    creator_id: "id-mock-astrodev",
    content: "Este é o comentário 3",
    likes: 100,
    dislikes: 30,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export class PostsDatabaseMock extends BaseDatabase {
  public static TABLE_NAME = "posts";
  public static TABLE_NAME_2 = "likes_dislikes";
  public static TABLE_COMMENT = "comments";

  public async insertPost(newPostsDB: PostsDBAmount): Promise<void> {
    postsMock.push(newPostsDB);
  }

  public async getPosts(): Promise<PostsDBAmount[]> {
    return postsMock;
  }

  public async findPostById(id: string): Promise<PostsDBAmount | undefined> {
    return postsMock.find((post) => post.id === id);
  }

  public async updatePost(postDB: PostsDBAmount): Promise<void> {
    const postIndex = postsMock.findIndex((post) => post.id === postDB.id);
    if (postIndex !== -1) {
      postsMock[postIndex] = postDB;
    }
  }

  public async deletePostById(id: string): Promise<void> {
    const postIndex = postsMock.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      postsMock.splice(postIndex, 1);
    }
  }

  public async insertLikeDislike(
    newLikeDislikeDB: likeDeslikeDB
  ): Promise<void> {
    likesDislikesMock.push(newLikeDislikeDB);
  }

  public async findLikeDislike(
    likeDislikeDB: likeDeslikeDB
  ): Promise<POST_LIKE | undefined> {
    const existingLikeDislike = likesDislikesMock.find(
      (ld) =>
        ld.user_id === likeDislikeDB.user_id &&
        ld.post_id === likeDislikeDB.post_id
    );

    if (!existingLikeDislike) {
      return undefined;
    } else if (existingLikeDislike.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  }

  public async removeLikeDislike(
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> {
    const likeDislikeIndex = likesDislikesMock.findIndex(
      (ld) =>
        ld.user_id === likeDislikeDB.user_id &&
        ld.post_id === likeDislikeDB.post_id
    );
    if (likeDislikeIndex !== -1) {
      likesDislikesMock.splice(likeDislikeIndex, 1);
    }
  }

  public async updateLikeDislike(
    likeDislikeDB: likeDeslikeDB
  ): Promise<void> {
    const likeDislikeIndex = likesDislikesMock.findIndex(
      (ld) =>
        ld.user_id === likeDislikeDB.user_id &&
        ld.post_id === likeDislikeDB.post_id
    );
    if (likeDislikeIndex !== -1) {
      likesDislikesMock[likeDislikeIndex] = likeDislikeDB;
    }
  }

  public async insertComment(newPost: CommentDB): Promise<void> {
    commentsMock.push(newPost);
  }

  public async findPostByIdAmount(
    idToEdit: string
  ): Promise<PostsDBAmount | undefined> {
    const postDB: PostsDBAmount | undefined = postsMock.find(
      (post) => post.id === idToEdit
    );
    return postDB;
  }

  public async getComments(idToEdit: string): Promise<CommentDB[]> {
    const data: CommentDB[] = commentsMock.filter(
      (comment) => comment.post_id === idToEdit
    );
    return data;
  }

  public async updateAmountComment(
    postId: string,
    newAmountComments: number
  ): Promise<void> {
    const postDB = postsMock.find((post) => post.id === postId);
    if (postDB) {
      postDB.amount_comments = newAmountComments;
    }
  }
}
