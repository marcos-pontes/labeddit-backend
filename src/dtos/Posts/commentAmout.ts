import z from "zod"

export interface CommentAmountInputDTO{
    idPost: string,
    token:string,
    amount: boolean
}

export type CommentAmountOutputDTO = undefined

export const CommentAmountSchema = z.object({
    idPost: z.string().min(2),
    token: z.string().min(2),
    amount: z.boolean()
}).transform(data => data as CommentAmountInputDTO)
