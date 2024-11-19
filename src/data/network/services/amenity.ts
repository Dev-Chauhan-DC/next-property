import remInstance from "../api_clients";
import { remEndpoints } from "../endpoints/remEndpoints";

export const createAmenities = async (propertyId: number, amenitiesArray: number[]) => {
    try {
        const data = {
            propertyId,
            amenitiesArray: JSON.stringify(amenitiesArray)
        }
        const result = await remInstance.post(remEndpoints.createAmenities, data);
        return result;
    } catch (e) {
        console.error(e);
        throw e
    }
}