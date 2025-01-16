import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IAgentAddress } from "../models/agentAddress";

export const agentAddressCreate = async (data: Partial<IAgentAddress>): Promise<IResponse<IAgentAddress>> => {
    try {
        const result = await remInstance.post(remEndpoints.agentAddressCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const agentAddressGet = async (): Promise<IResponse<IAgentAddress[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentAddressGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const agentAddressUpdate = async (id: number, data: IAgentAddress): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.agentAddressUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const agentAddressDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.agentAddressDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const agentAddressGetAllByAgent = async (agent_id: number): Promise<IResponse<IAgentAddress[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.agentAddressGetAllByAgent + '/' + agent_id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}