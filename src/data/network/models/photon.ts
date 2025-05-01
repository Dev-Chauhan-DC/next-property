export interface IPhoton {
    features: IPhotonFeature[]
    type: string
}


export interface IPhotonParams {
    q: string,
    bbox?: string,
    lang?: string,
    limit?: number
}

export interface IPhotonFeature {
    geometry: Geometry
    type?: string
    properties: Properties
}

export interface Geometry {
    coordinates: number[]
    type: string
}

export interface Properties {
    osm_id: number
    extent: number[]
    country: string
    city?: string
    countrycode: string
    postcode?: string
    county?: string
    type: string
    osm_type: string
    osm_key: string
    district?: string
    osm_value: string
    name: string
    state: string
}
