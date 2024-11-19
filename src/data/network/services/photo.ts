import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";


export const createPhotos = async (propertyId: number, imageFileIds: number[]) => {
    try {
        const result = await remInstance.post(remEndpoints.createPhotos, { propertyId, imageFileIds });
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}