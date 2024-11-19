import axios from "axios";
import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IGetPresignedUrl } from "../models/s3";
import { IResponse } from "../models";

export const getPresignedUrl = async (data: IGetPresignedUrl): Promise<IResponse<string>> => {
    try {
        const result = await remInstance.post(remEndpoints.getPresignedUrl, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const uploadImage = async (presignedUrl: string, data: any, mimeType: string) => {
    try {
        const result = await axios.put(presignedUrl, data, {
            headers: {
                'Content-Type': mimeType,
            },
        });
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
