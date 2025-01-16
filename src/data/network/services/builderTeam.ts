import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IBuilderTeam } from "../models/builderTeam";

export const builderTeamCreate = async (data: Partial<IBuilderTeam>): Promise<IResponse<IBuilderTeam>> => {
    try {
        const result = await remInstance.post(remEndpoints.builderTeamCreate, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderTeamGet = async (): Promise<IResponse<IBuilderTeam[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderTeamGet);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderTeamGetAllByBuilder = async (builder_id: number): Promise<IResponse<IBuilderTeam[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.builderTeamGetAllByBuilder + '/' + builder_id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const builderTeamUpdate = async (id: number, data: IBuilderTeam): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.put(remEndpoints.builderTeamUpdate + '/' + id, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export const builderTeamDelete = async (id: number): Promise<IResponse<any>> => {
    try {
        const result = await remInstance.delete(remEndpoints.builderTeamDelete + '/' + id);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}