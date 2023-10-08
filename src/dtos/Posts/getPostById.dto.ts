import z from "zod"

import { GetPostsModel} from "../../models/Post"


export interface GetPostsByIdInputDTO {
  postId:string
  token:string
}

export type GetPostsByIdOutputDTO = GetPostsModel ;

export const GetPostsByIdSchema = z.object({
  postId: z.string().min(2),
  token:z.string().min(2)
}).transform(data => data as GetPostsByIdInputDTO)