import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { ICreateFile } from "../models/file";

export const createFile = async (data: ICreateFile) => {
    try {
        const result = await remInstance.post(remEndpoints.createFile, data);
        return result;
    } catch (e) {
        console.error(e);
        throw e
    }
}

export const readFile = async (fileId: string | number) => {
    try {
        const result = await remInstance.post(remEndpoints.readFile, { fileId });
        return result;
    } catch (e) {
        console.error(e);
        throw e
    }
}
