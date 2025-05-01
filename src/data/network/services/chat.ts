import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IAgent } from "../models/agent";
import { IChat } from "../models/chat";
import { IConversation } from "../models/conversation";


export const getChats = async (conversation_id: number, page: number = 1, limit: number = 10): Promise<IResponse<IChat[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.getChats(conversation_id), {
            params: {
                page: page,
                limit: limit
            }
        });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
