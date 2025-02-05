import { Builder } from "postcss";
import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IBuilder } from "../models/builder";

export const builderUpdate = async (data: Partial<IBuilder>): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.builderUpdate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const adminBuilderUpdate = async (id: number, data: Partial<IBuilder>): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.adminBuilderUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const adminBuilderDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.adminBuilderDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderCreate = async (data: Partial<IBuilder>): Promise<IResponse<IBuilder>> => {
    try {
        const result = await remInstance.post(remEndpoints.builderCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderGetCurrent = async (): Promise<IResponse<IBuilder>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderGetCurrent);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderGet = async (id: number): Promise<IResponse<IBuilder>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderGet + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderGetAll = async (name?: string): Promise<IResponse<IBuilder[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderGetAll, {
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