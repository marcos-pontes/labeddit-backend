import express from "express";
import { PostsController } from "../controller/PostsController";
import { PostsBusiness } from "../business/PostBusiness";
import { PostsDatabase } from "../database/PostDatabase";
import { IdGenerator } from "../service/IdGenerator";
import { TokenManager } from "../service/TokenManager";
import { UserDatabase } from "../database/UsersDatabase";
export const postsRouter = express.Router();
const postsController = new PostsController(
  new PostsBusiness(
    new PostsDatabase(),
    new IdGenerator(),
    new TokenManager(),
    new UserDatabase()
  )
);

postsRouter.post("/", postsController.createPost);
postsRouter.post("/comment/:id", postsController.createComment);
postsRouter.get("/", postsController.getPosts);
postsRouter.get("/:id", postsController.getPostById);

postsRouter.get("/comment/:id", postsController.getComments);
postsRouter.put("/:id", postsController.editPosts);
postsRouter.delete("/:id", postsController.deletePost);

postsRouter.put("/:id/like", postsController.likeDislike)