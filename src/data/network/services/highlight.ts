import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IHighlighBulkCreateParam } from "../models/highlight";

export const highlightBulkCreate = async (data: IHighlighBulkCreateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.post(remEndpoints.highlightBulkCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const highlightBulkUpdate = async (data: IHighlighBulkCreateParam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.highlightBulkUpdate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

