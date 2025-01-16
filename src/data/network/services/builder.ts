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