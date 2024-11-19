import { IProperty, IUser } from "./property"

export interface ISaveProperty {
    id: number
    property_id: number
    user_id: number
    updatedAt: string
    createdAt: string
    property?: IProperty
    user?: IUser
}