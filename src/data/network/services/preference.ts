import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IPreferenceBulkCreateParam } from "../models/preference";

export const preferenceBulkCreate = async (data: IPreferenceBulkCreateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.post(remEndpoints.preferenceBulkCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const preferenceBulkUpdate = async (data: IPreferenceBulkCreateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.preferenceBulkUpdate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
