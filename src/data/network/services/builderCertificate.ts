import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IBuilderCertificate } from "../models/builderCertificate";
import { IBuilderTeam } from "../models/builderTeam";

export const builderCertificateCreate = async (data: Partial<IBuilderCertificate>): Promise<IResponse<IBuilderCertificate>> => {
    try {
        const result = await remInstance.post(remEndpoints.builderCertificateCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderCertificateGet = async (): Promise<IResponse<IBuilderCertificate[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderCertificateGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderCertificateUpdate = async (id: number, data: IBuilderCertificate): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.builderCertificateUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderCertificateDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.builderCertificateDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderCertificateGetAllByBuilder = async (builder_id: number): Promise<IResponse<IBuilderCertificate[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderCertificateGetAllByBuilder + '/' + builder_id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}