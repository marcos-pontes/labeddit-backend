import z from "zod"

import {  GetcommentModel} from "../../models/Post"


export interface GetCommentsInputDTO {
  token:string
  postId:string
}

export type GetCommentsOutputDTO = GetcommentModel[];

export const GetCommentsSchema = z.object({
  token: z.string().min(2),
  postId:z.string().min(2)
}).transform(data => data as GetCommentsInputDTO)