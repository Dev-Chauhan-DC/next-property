import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IPhotoCategory } from "../models/photoCategory";

export const photoCategoryGetAll = async (name?: string): Promise<IResponse<IPhotoCategory[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.photoCategoryGetAll, {
            params: {
                name
            }
        });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

