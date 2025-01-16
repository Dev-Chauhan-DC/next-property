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