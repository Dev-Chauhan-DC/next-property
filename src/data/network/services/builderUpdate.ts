import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IBuilderUpdate } from "../models/builderUpdate";

export const builderUpdateCreate = async (data: IBuilderUpdate): Promise<IResponse<IBuilderUpdate>> => {
    try {
        const result = await remInstance.post(remEndpoints.builderUpdateCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderUpdateGet = async (): Promise<IResponse<IBuilderUpdate[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderUpdateGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderUpdateUpdate = async (id: number, data: IBuilderUpdate): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.builderUpdateUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderUpdateDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.builderUpdateDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderUpdateGetAllByBuilder = async (builder_id: number): Promise<IResponse<IBuilderUpdate[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderUpdateGetAllByBuilder + '/' + builder_id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}