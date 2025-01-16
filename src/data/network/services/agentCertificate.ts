import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IAgentCertificate } from "../models/agentCertificate";

export const agentCertificateCreate = async (data: Partial<IAgentCertificate>): Promise<IResponse<IAgentCertificate>> => {
    try {
        const result = await remInstance.post(remEndpoints.agentCertificateCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const agentCertificateGet = async (): Promise<IResponse<IAgentCertificate[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentCertificateGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const agentCertificateUpdate = async (id: number, data: IAgentCertificate): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.agentCertificateUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const agentCertificateDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.agentCertificateDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const agentCertificateGetAllByAgent = async (agent_id: number): Promise<IResponse<IAgentCertificate[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentCertificateGetAllByAgent + '/' + agent_id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}