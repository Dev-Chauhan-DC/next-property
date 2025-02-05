import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IPropertyPhoto } from "../models/propertyPhoto";


export const createPhotos = async (propertyId: number, imageFileIds: number[]) => {
    try {
        const result = await remInstance.post(remEndpoints.createPhotos, { propertyId, imageFileIds });
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const createPhotosV2 = async (data: IPropertyPhoto[]): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.post(remEndpoints.createPhotosV2, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const propertyPhotoDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.propertyPhotoDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const propertyPhotoUpdate = async (id: number, data: IPropertyPhoto): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.propertyPhotoUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const propertyPhotoCreate = async (data: IPropertyPhoto): Promise<IResponse<IPropertyPhoto>> => {
    try {
        const result = await remInstance.post(remEndpoints.propertyPhotoCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}