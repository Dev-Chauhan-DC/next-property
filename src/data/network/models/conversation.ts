import { IUser } from "./property"

export interface IConversation {
    id: number
    user1_id: number
    user2_id: number
    user1: IUser
    user2: IUser
    createdAt: string
    updatedAt: string
}


