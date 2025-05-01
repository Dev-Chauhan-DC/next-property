import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { ISaveProperty } from "../models/saveProperty";
import { IProperty } from "../models/property";
import { IFilters } from "@/src/utilities/interfaces/search";





export const saveProperty = async (propertyId: number): Promise<IResponse<ISaveProperty | number>> => {
    try {
        const result = await remInstance.post(remEndpoints.saveProperty, { propertyId });
        return result.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const getSavedProperty = async (params: IFilters): Promise<IResponse<ISaveProperty[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.getSavedProperty, {
            params: {
                ...params
            }
        });
        return result.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}


export const getSavedPropertyV2 = async (params: IFilters): Promise<IResponse<ISaveProperty[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.getSavedPropertyV2, {
            params: {
                ...params
            }
        });
        return result.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}