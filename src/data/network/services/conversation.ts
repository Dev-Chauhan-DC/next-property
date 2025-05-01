import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IAgent } from "../models/agent";
import { IConversation } from "../models/conversation";

export const conversationCreate = async (property_id: number): Promise<IResponse<IConversation>> => {
    try {
        const result = await remInstance.post(remEndpoints.conversationCreate, { property_id });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getConversation = async (): Promise<IResponse<IConversation[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.conversationGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
