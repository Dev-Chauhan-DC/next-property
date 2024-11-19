import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";


export const createOrder = async (couponCode: string, planId: number): Promise<any> => {
    try {
        const result = await remInstance.post(remEndpoints.createOrder, { couponCode, planId });
        return result.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}