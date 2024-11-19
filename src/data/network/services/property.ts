import { IGeometry, IFilters, IViewport } from "@/src/utilities/interfaces/search";
import remInstance from "../api_clients"
import { remEndpoints } from "../endpoints/remEndpoints"
import { IGetPropertyParams, IPostProperty, IProperty } from "../models/property"
import { IResponse } from "../models";

export const postProperty = async (data: IPostProperty) => {
    try {
        const result = await remInstance.post(remEndpoints.postProperty, data);
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const getUserProperties = async (page: number, limit?: number): Promise<IResponse<IProperty[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.getUserProperties, {
            params: {
                page,
                limit
            }
        });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const deleteProperty = async (propertyId: number) => {
    try {
        const result = await remInstance.delete(remEndpoints.deleteProperty + "/" + propertyId);
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const searchAndFilters = async (viewport: IViewport, filters: IFilters): Promise<IResponse<IProperty[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.searchAndFilters + `/${viewport.southwest.lat}/${viewport.southwest.lng}/${viewport.northeast.lat}/${viewport.northeast.lng}`,
            {
                params: filters
            });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getProperty = async (propertyId: number, queryParams: IGetPropertyParams): Promise<IResponse<IProperty>> => {
    try {
        const result = await remInstance.post(remEndpoints.getProperty, { propertyId }, { params: queryParams });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export const getPropertiesByIds = async (params: { ids: number[] }): Promise<IResponse<IProperty[]>> => {
    try {
        const result = await remInstance.get(remEndpoints.getPropertiesByIds,
            {
                params: { ...params, ids: params.ids.join(',') }
            });
        return result.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


