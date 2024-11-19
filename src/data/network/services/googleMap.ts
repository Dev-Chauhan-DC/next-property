import remInstance from "../api_clients"
import { remEndpoints } from "../endpoints/remEndpoints"
import { IResponse } from "../models"
import { IGoogleSuggetion, IPlaceDetails } from "../models/googleMap"

export const placeAutocomplete = async (input: string, types: string = "geocode", fields: string = "ChIJYxUdQVlO4DsRQrA4CSlYRf4,description"): Promise<IResponse<IGoogleSuggetion>> => {
    try {
        const result = await remInstance.get(remEndpoints.placeAutocomplete, {
            params: {
                input,
                types,
                fields,
            }
        })

        return result.data
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const placeDetails = async (placeId: string): Promise<IResponse<IPlaceDetails>> => {
    try {
        const result = await remInstance.get(remEndpoints.placeDetails, {
            params: {
                placeId
            }
        })

        return result.data
    } catch (e) {
        console.error(e)
        throw e
    }
}