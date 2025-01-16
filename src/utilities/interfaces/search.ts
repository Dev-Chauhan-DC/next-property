export interface IGeometry {
    location: Location
    viewport: IViewport
}

export interface Location {
    lat: number
    lng: number
}

export interface IViewport {
    northeast: Northeast
    southwest: Southwest
}

export interface Northeast {
    lat: number
    lng: number
}

export interface Southwest {
    lat: number
    lng: number
}

export interface IFilters {
    purposeId?: number;
    homeTypeId?: string;
    userRoleId?: string;
    priceRange?: string;
    bedroomCount?: string;
    bathroomCount?: string;
    hallCount?: string;
    kitchenCount?: string;
    balconyCount?: string;
    builtUpArea?: string;
    maintenance?: string;
    propertyAge?: string;
    daysOnApp?: string;
    parkingSlotTwoWheelerCount?: string;
    parkingSlotFourWheelerCount?: string;
    totalFloor?: string;
    propertyFloor?: string;
    availabilityTypeId?: string;
    furnishingsId?: string;
    facingId?: string;
    cornerProperty?: string;
    verifiedProperty?: string;
    agentCertification?: string;
    possessionsId?: string;
    tenantsId?: string;
    sorting?: string;
    page?: number;
    limit?: number;
    view?: 'map' | 'list';
    project_type_id?: string;
    builder_id?: string;
}

export type ISorting =
    'relevance' |
    'newest' |
    'price-highToLow' |
    'price-lowToHigh' |
    'bathroom_count-highToLow' |
    'bathroom_count-lowToHigh' |
    'bedroom_count-highToLow' |
    'bedroom_count-lowToHigh' |
    'hall_count-highToLow' |
    'hall_count-lowToHigh' |
    'kitchen_count-highToLow' |
    'kitchen_count-lowToHigh' |
    'built_up_area-highToLow' |
    'built_up_area-lowToHigh' 
