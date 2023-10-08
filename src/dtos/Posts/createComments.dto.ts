import z from "zod";


export interface CreateCommentInputDTO {
  content: string;
  token: string;
  postId:string;
  likes: number;
  deslikes: number;
}

export type CreateCommentOutputDTO = undefined

export const createCommentSchema = z.object({
  content: z.string().min(2),
  token: z.string().min(2),
  postId: z.string().min(2)
}).transform(data => data as CreateCommentInputDTO)
