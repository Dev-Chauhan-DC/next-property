import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IBuilderAddress } from "../models/builderAddress";

export const builderAddressCreate = async (data: Partial<IBuilderAddress>): Promise<IResponse<IBuilderAddress>> => {
    try {
        const result = await remInstance.post(remEndpoints.builderAddressCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderAddressGet = async (): Promise<IResponse<IBuilderAddress[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderAddressGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderAddressUpdate = async (id: number, data: IBuilderAddress): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.builderAddressUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderAddressDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.builderAddressDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderAddressGetAllByBuilder = async (builder_id: number): Promise<IResponse<IBuilderAddress[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderAddressGetAllByBuilder + '/' + builder_id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}