import { IUser } from "./property"

export interface IInterestedPeople {
    id: number
    properties_id: number
    users_id: number
    updatedAt: string
    createdAt: string
    user: IUser
}