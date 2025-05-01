import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IMealBulkCreateParam } from "../models/meal";

export const mealBulkCreate = async (data: IMealBulkCreateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.post(remEndpoints.mealBulkCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const mealBulkUpdate = async (data: IMealBulkCreateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.mealBulkUpdate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

