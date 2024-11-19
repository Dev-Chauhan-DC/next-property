import remInstance from "../api_clients"
import { remEndpoints } from "../endpoints/remEndpoints"
import { IResponse } from "../models";
import { IVerifyOtp } from "../models/user";

export const sendOtp = async (data: { phone: string }) => {
    try {
        const result = await remInstance.post(remEndpoints.sendOtp, data);
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const verifyOtp = async (data: { phone: string, otp: string }): Promise<IResponse<IVerifyOtp>> => {
    try {
        const result = await remInstance.post(remEndpoints.verifyOtp, data);
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}