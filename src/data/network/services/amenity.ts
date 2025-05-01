import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IAmenityBulkUpdateParam } from "../models/amenity";

export const createAmenities = async (propertyId: number, amenitiesArray: number[]) => {
    try {
        const data = {
            propertyId,
            amenitiesArray: JSON.stringify(amenitiesArray)
        }
        const result = await remInstance.post(remEndpoints.createAmenities, data);
        return result;
    } catch (e) {
        console.error(e);
        throw e
    }
}


export const amenityBulkUpdate = async (data: IAmenityBulkUpdateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.amenityBulkUpdate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
