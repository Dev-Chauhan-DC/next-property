import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IAgent } from "../models/agent";

export const agentUpdate = async (data: Partial<IAgent>): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.agentUpdate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const adminAgentUpdate = async (id: number, data: Partial<IAgent>): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.adminAgentUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const agentGetCurrent = async (): Promise<IResponse<IAgent>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentGetCurrent);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const agentGet = async (id: number): Promise<IResponse<IAgent>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentGet + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const agentGetAll = async (name?: string): Promise<IResponse<IAgent[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentGetAll, {
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

export const agentCreate = async (data: Partial<IAgent>): Promise<IResponse<IAgent>> => {
    try {
        const result = await remInstance.post(remEndpoints.agentCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const adminAgentDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.adminAgentDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}