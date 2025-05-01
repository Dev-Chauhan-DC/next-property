import { IGeometry } from "@/src/data/network/models/googleMap";
import { IPhotonFeature } from "@/src/data/network/models/photon";

export const convertPhotonFeature = (feature: IPhotonFeature): IGeometry => {
    const { geometry, properties } = feature;
    const [lng, lat] = geometry.coordinates;

    let viewport = {
        northeast: {
            lat: 0,
            lng: 0,
        },
        southwest: {
            lat: 0,
            lng: 0,
        },
    };
    if (properties.extent) {
        viewport = {
            northeast: {
                lat: properties.extent[1],
                lng: properties.extent[2],
            },
            southwest: {
                lat: properties.extent[3],
                lng: properties.extent[0],
            },
        };
    }

    return {
        location: { lat, lng },
        viewport: viewport,
    };
};