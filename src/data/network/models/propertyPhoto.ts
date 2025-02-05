import { IPhotoCategory } from "./photoCategory";

export interface IPropertyPhoto {
    id?: number,
    properties_id?: number,
    photos?: string,
    file_id?: number,
    category_id?: number,
    category_name?: string,
    createdAt?: string,
    updatedAt?: string,
    url?: string,
    property_photo_category?: IPhotoCategory
}