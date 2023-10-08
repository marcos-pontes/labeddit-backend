import { GetPostsFromUser } from "./User";

export interface CommentDB {
  id: string;
  creator_id: string;
  post_id:string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface CommentModel {
    id: string;
    creatorId: string;
    postId:string;
    content: string;
    likes: number;
    dislike: number;
    createdAt: string;
    updatedAt: string;
    
  }
export interface CommentModelAmount {
    id: string;
    creatorId: string;
    postId:string;
    content: string;
    likes: number;
    dislike: number;
    createdAt: string;
    updatedAt: string;
    amountComments:number
  }

export interface GetCommentModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: GetPostsFromUser;
}


export class Comment {
  constructor(
    private id: string,
    private creatorId: string,
    private post_id:string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
   
  ) {}
  public getId(): string {
    return this.id;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public getContent(): string {
    return this.content;
  }

  public getLikes(): number {
    return this.likes;
  }
  public getDeslike(): number {
    return this.dislikes;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public setId(value: string): void {
    this.id = value;
  }
  public setCreatorId(value: string): void {
    this.createdAt = value;
  }

  public setContent(value: string): void {
    this.content = value;
  }

  public setLike(value: number): void {
    this.likes = value;
  }

  public setCreatedAt(value: string): void {
    this.createdAt = value;
  }

  public setUpdatedAt(value: string): void {
    this.updatedAt = value;
  }
  public addLike = (): void => {
    this.likes++
  }

  public removeLike = (): void => {
    this.likes--
  }

  public setDislikess(value: number): void {
    this.dislikes = value
  }

  public addDislikes = (): void => {
    this.dislikes++
  }

  public removeDislikes = (): void => {
    this.dislikes--
  }

  public toBusinessModelComments(): CommentModel {
    return {
      id: this.id,
      creatorId: this.creatorId,
      postId:this.post_id,
      content: this.content,
      likes: this.likes,
      dislike: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
 

  public toDBModel(): CommentDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      post_id:this.post_id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
