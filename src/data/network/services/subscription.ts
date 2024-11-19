import remInstance from "../api_clients"
import { remEndpoints } from "../endpoints/remEndpoints"
import { IResponse } from "../models";
import { ICreateSubscription, ISubscription } from "../models/subscription";

export const isSubscriptionActive = async () => {
    try {
        const result = await remInstance.get(remEndpoints.isSubscriptionActive);
        return result;
    } catch (e) {
        console.error(e)
        throw e
    }
}


export const createSubscription = async (data: ICreateSubscription): Promise<IResponse<ISubscription>> => {
    try {
        const result = await remInstance.post(remEndpoints.createSubscription, data);
        return result.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}
