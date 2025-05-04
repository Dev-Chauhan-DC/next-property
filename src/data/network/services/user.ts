import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";
import { IResponse } from "../models";
import { IUpdateUser, IUser } from "../models/user";

export const getUser = async (): Promise<IResponse<IUser>> => {
    try {
        const result = await remInstance.get(remEndpoints.getUser);
        return result.data;
    } catch (e) {
        console.error(e)
        throw e;
    }
}


export const updateUser = async (data: IUpdateUser) => {
    try {
        const result = await remInstance.post(remEndpoints.updateUser, data);
        return result
    } catch (e) {
        console.error(e)
        throw e;
    }
}


export const updateUserV2 = async (user: IUser): Promise<IResponse<IUser>> => {
    try {
        const result = await remInstance.put(remEndpoints.updateUserV2, user);
        return result.data
    } catch (e) {
        console.error(e)
        throw e;
    }
}

export const updateRole = async (roleId: number): Promise<IResponse<number[]>> => {
    try {
        const result = await remInstance.post(remEndpoints.role, { roleId });
        return result.data
    } catch (e) {
        console.error(e)
        throw e;
    }
}

export const getUserByID = async (id: number): Promise<IResponse<IUser>> => {
    try {
        const result = await remInstance.get(remEndpoints.getUserByID + '/' + id);
        return result.data
    } catch (e) {
        console.error(e)
        throw e;
    }
}