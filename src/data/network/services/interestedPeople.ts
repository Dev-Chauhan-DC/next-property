import remInstance from "../api_clients";
import { prepath, remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IInterestedPeople } from "../models/interestedPeople";


export const createInterestedPeople = async (propertyId: number): Promise<IResponse<IInterestedPeople>> => {
    try {
        const result = await remInstance.post(remEndpoints.createInterestedPeople, { propertyId });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getInterestedPeople = async (propertyId: number, params: { page: number }): Promise<IResponse<IInterestedPeople[]>> => {
    try {
        const result = await remInstance.get(`${prepath}/property/${propertyId}/interested/peoples`, {
            params: params
        });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}