import { CreatePostOutputDTO } from "./../dtos/Posts/createPosts.dto";
import { PostsDatabase } from "../database/PostDatabase";
import { GetPostsModel, GetPostsModelAmount, POST_LIKE, Posts, likeDeslikeDB } from "../models/Post";
import { IdGenerator } from "../service/IdGenerator";
import { TokenManager } from "../service/TokenManager";
import { BadRequestError } from "../error/BadRequestError";
import {
  GetPostsInputDTO,
  GetPostsOutputDTO,
} from "../dtos/Posts/getPosts.dto";
import {
  EditPostsInputDTO,
  EditPostsOutputDTO,
} from "../dtos/Posts/editPosts.dto";
import { NotFoundError } from "../error/NotFoundError";
import { CreatePostInputDTO } from "../dtos/Posts/createPosts.dto";
import { UserDatabase } from "../database/UsersDatabase";
import {
  DeletePostsInputDTO,
  DeletePostsoutputDTO,
} from "../dtos/Posts/deletePosts.dto";
import { USER_ROLES } from "../models/User";
import {
  LikeDislikeOutputDTO,
  LikeDislikeinputDTO,
} from "../dtos/Posts/likeDislike.dto";
import { GetPostsByIdInputDTO } from "../dtos/Posts/getPostById.dto";
import {
  GetCommentsInputDTO,
  GetCommentsOutputDTO,
} from "../dtos/Posts/getComments.dto";
import { Comment } from "../models/Comments";
import {
  CreateCommentInputDTO,
  CreateCommentOutputDTO,
} from "../dtos/Posts/createComments.dto";
import { CommentAmountInputDTO, CommentAmountOutputDTO } from "../dtos/Posts/commentAmout";

export class PostsBusiness {
  constructor(
    public postsDatabase: PostsDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    public userDatabase: UserDatabase
  ) {}
  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostOutputDTO> => {
    const { content, token } = input;
    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("token invalido");
    }

    const id = this.idGenerator.generatorId();

    const postDBExists = await this.postsDatabase.findPostById(id);

    if (postDBExists) {
      throw new BadRequestError("'id' já existe");
    }

    const newPost = new Posts(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      0
    );

    const newPostToDB = newPost.toDBModel();

    await this.postsDatabase.insertPost(newPostToDB);

    const output: CreatePostOutputDTO = undefined;

    return output;
  };

  public createComment = async (
    input: CreateCommentInputDTO
  ): Promise<CreateCommentOutputDTO> => {
    const { content, token, postId } = input;
    const payload = this.tokenManager.getPayload(token);
    if (!payload) {
      throw new BadRequestError("token invalido");
    }

    const id = this.idGenerator.generatorId();


    const newPost = new Comment(
      id,
      payload.id,
      postId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
    );

    const newPostToDB = newPost.toDBModel();
    
   const postsDB =  await this.postsDatabase.findPostByIdAmount(postId)
    await this.postsDatabase.insertComment(newPostToDB);
    if (!postsDB) {
      throw new BadRequestError("Post não encontrado");
    }

    await this.postsDatabase.updateAmountComment(postId, postsDB.amount_comments +1) 

    const output: CreateCommentOutputDTO = undefined;

    return output;
  };

  public getPost = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => { 
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("token invalid");
    }

    const postsDB = await this.postsDatabase.getPosts();

    const getPosts = postsDB.map((postsDB) => {
      const post = new Posts(
        postsDB.id,
        postsDB.creator_id,
        postsDB.content,
        postsDB.likes,
        postsDB.dislikes,
        postsDB.created_at,
        postsDB.updated_at,
        postsDB.amount_comments
      );
      return post.toBusinessModel();
    });

    const getPostCreatorId = getPosts.map((post) => post.creatorId);

    const userName: any = [];

    for (let i = 0; i < getPostCreatorId.length; i++) {
      const result = await this.userDatabase.returnUserName(
        getPostCreatorId[i]
      );

      userName.push(result);
    }

    const post = getPosts.map((post, index) => {
      const postModel = {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislike,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        amountComments:post.amountComments,
        creator: {
          id: post.creatorId,
          name: userName[index],
        },
      };
      return postModel;
    });

    const output: GetPostsOutputDTO = post;

    return output;
  };
  public getComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token, postId } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new BadRequestError("token invalid");
    }

    const postExist = await this.postsDatabase.findPostById(postId);

    if (!postExist) {
      throw new BadRequestError("Post not found");
    }

    const postsDB = await this.postsDatabase.getComments(postId);

    const getPosts = postsDB.map((postsDB) => {
      const post = new Comment(
        postsDB.id,
        postsDB.creator_id,
        postsDB.post_id,
        postsDB.content,
        postsDB.likes,
        postsDB.dislikes,
        postsDB.created_at,
        postsDB.updated_at
      );
      return post.toBusinessModelComments();
    });

    const getPostCreatorId = getPosts.map((post) => post.creatorId);

    const userName: any = [];

    for (let i = 0; i < getPostCreatorId.length; i++) {
      const result = await this.userDatabase.returnUserName(
        getPostCreatorId[i]
      );

      userName.push(result);
    }

    const post = getPosts.map((post, index) => {
      const postModel = {
        id: post.id,
        content: post.content,
        likes: post.likes,
        dislikes: post.dislike,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        creator: {
          id: post.creatorId,
          name: userName[index],
        },
      };
      return postModel;
    });

    const output: GetCommentsOutputDTO = post;

    return output;
  };



  public likeDislikePost = async (
    input: LikeDislikeinputDTO
  ): Promise<LikeDislikeOutputDTO> => {
    const { idPost, token, like } = input;

    const payLoad = this.tokenManager.getPayload(token);

    if (!payLoad) {
      throw new BadRequestError('"Token" invalid');
    }
    const postDB = await this.postsDatabase.findPostById(idPost);

    if (!postDB) {
      throw new NotFoundError('"idPost" not found');
    }

    const post = new Posts(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at,
      postDB.amount_comments
    );

    const likeSQlite = like ? 1 : 0;

    const likeDislikeDB: likeDeslikeDB = {
      user_id: payLoad.id,
      post_id: idPost,
      like: likeSQlite,
    };

    const likeDislikeExists = await this.postsDatabase.findLikeDislike(
      likeDislikeDB
    );

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeLike();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeLike();
        post.addDislikes();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postsDatabase.removeLikeDislike(likeDislikeDB);
        post.removeDislikes();
      } else {
        await this.postsDatabase.updateLikeDislike(likeDislikeDB);
        post.removeDislikes();
        post.addLike();
      }
    } else {
      await this.postsDatabase.insertLikeDislike(likeDislikeDB);
      like ? post.addLike() : post.addDislikes();
    }

    const updatedPostDB = post.toDBModel();
    await this.postsDatabase.updatePost(updatedPostDB);

    const output: LikeDislikeOutputDTO = undefined;

    return output;
  };

  public getPostById = async (
    input: GetPostsByIdInputDTO
  ): Promise<GetPostsModel[]> => {
    const { postId, token } = input;
    const postDB = await this.postsDatabase.findPostById(postId);

    if (!postDB) {
      throw new BadRequestError("Post not found");
    }

    const payLoad = this.tokenManager.getPayload(token);

    if (!payLoad) {
      throw new BadRequestError('"Token" invalid');
    }

    const postModel: GetPostsModel = {
      id: postDB.id,
      content: postDB.content,
      likes: postDB.likes,
      dislikes: postDB.dislikes,
      createdAt: postDB.created_at,
      updatedAt: postDB.updated_at,
      amountComments:postDB.amount_comments,
      creator: {
        id: postDB.creator_id,
        name: await this.userDatabase.returnUserName(postDB.creator_id),
      },
    };

    const output: GetPostsModel[] = [postModel];

    return output;
  };

  /* public getAmountComments = async (
    input: CommentAmountInputDTO
  ): Promise<CommentAmountOutputDTO> => {
    const { idPost, token, amount} = input;
    const postDB = await this.postsDatabase.findPostById(idPost);

    if (!postDB) {
      throw new BadRequestError("Post not found");
    }

    const payLoad = this.tokenManager.getPayload(token);

    if (!payLoad) {
      throw new BadRequestError('"Token" invalid');
    }

    const post = new Posts(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      postDB.updated_at
    );

    const likeSQlite = amount ? 1 : 0;

    const likeDislikeDB: likeDeslikeDB = {
      user_id: payLoad.id,
      post_id: idPost,
      like: likeSQlite,
    };

    const likeDislikeExists = await this.postsDatabase.findAmoutComment(
      likeDislikeDB
    );
    
   

    const postModel: GetPostsModelAmount = {
      id: postDB.id,
      content: postDB.content,
      likes: postDB.likes,
      dislikes: postDB.dislikes,
      createdAt: postDB.created_at,
      updatedAt: postDB.updated_at,
      amount: totalAmount,
      creator: {
        id: postDB.creator_id,
        name: await this.userDatabase.returnUserName(postDB.creator_id),
      },
    };

    const output: GetPostsModel[] = [postModel];

    return output;
  }; */
}
