import { IAgent } from "./agent"
import { IBuilder } from "./builder"
import { IUser } from "./user"

export interface IPostProperty {
    purposeId: number
    homeTypeId: number
    address: string
    landmark: string
    area: string
    pincode: string
    city: string
    state: string
    bedroomCount: number
    bathroomCount: number
    hallCount: number
    kitchenCount: number
    balconyCount: number
    builtUpArea: number
    carpetArea: number
    plotArea: number
    facingId: number
    propertyAge: number
    totalFloor: number
    propertyFloor: number
    flooringTypeId: number
    ownershipTypeId: number
    latitude: number
    longitude: number
    price: number
    negotiable: number
    maintenance: number
    currentlyUnderLoan: number
    availabilityTypeId: number
    furnishingsId: number
    parkingSlotTwoWheelerCount: number
    parkingSlotFourWheelerCount: number
    cupboard: number
    kitchenTypesId: number
    propertyDescription: string
    gatedSecurity: number
    gym: number
    waterSuppliesId: number
    powerBackupsId: number
    cornerProperty: number
    verifiedProperty: number
    agentCertification: number
    possessionsId: number
    flatsInBuilding: string
    deposit: number
    tenantsId: number
}

export interface ICardPropertyInfo {
    id: number
    price: number
    bedroom_count: number
    bathroom_count: number
    hall_count: number
    kitchen_count: number
    balcony_count: number
    built_up_area: number
    address: string
    landmark: string
    area: string
    pincode: string
    city: string
    state: string
    createdAt: string
    property_photos: IPropertyPhoto[]
    user: IUser
}

export interface IPropertyPhoto {
    id: number
    properties_id: number
    photos: string
    file_id: number
    createdAt: string
    updatedAt: string
}

export interface IUserRole {
    id: number
    role: string
    createdAt: string
    updatedAt: string
}


export interface IAmenity {
    id?: number;
    amenitie?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPropertyAmenity {
    id?: number;
    properties_id?: number;
    amenities_id?: number;
    createdAt?: string;
    updatedAt?: string;
    amenity?: IAmenity;
}


export interface IPurpose {
    id?: number;
    purpose?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IHomeType {
    id?: number;
    home_type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFacing {
    id?: number;
    facing?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFlooringType {
    id?: number;
    flooring_type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IOwnershipType {
    id?: number;
    ownership_type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAvailabilityType {
    id?: number;
    availability_type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFurnishing {
    id?: number;
    furnishing?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IKitchenType {
    id?: number;
    kitchen_type?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IWaterSupply {
    id?: number;
    water_supply?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPowerBackup {
    id?: number;
    power_backup?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPossession {
    id?: number;
    possession?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ITenant {
    id?: number;
    tenant?: string;
    createdAt?: string;
    updatedAt?: string;
}



export interface IProperty {
    id: number;
    user_id?: number;
    purpose_id?: number;
    home_types_id?: number;
    address?: string;
    landmark?: string;
    area?: string;
    pincode?: string;
    city?: string;
    state?: string;
    bedroom_count?: number;
    bathroom_count?: number;
    hall_count?: number;
    kitchen_count?: number;
    balcony_count?: number;
    built_up_area?: number;
    carpet_area?: number;
    plot_area?: number;
    facing_id?: number;
    property_age?: number;
    total_floor?: number;
    property_floor?: number;
    flooring_types_id?: number;
    ownership_types_id?: number;
    latitude?: number;
    longitude?: number;
    price?: number;
    negotiable?: boolean;
    maintenance?: number;
    currently_under_loan?: boolean;
    availability_types_id?: number;
    furnishings_id?: number;
    parking_slot_two_wheeler_count?: number;
    parking_slot_four_wheeler_count?: number;
    cupboard?: number;
    kitchen_types_id?: number;
    property_description?: string;
    gated_security?: boolean;
    gym?: boolean;
    water_supplies_id?: number;
    power_backups_id?: number;
    corner_property?: boolean;
    verified_property?: boolean;
    agent_certification?: boolean;
    possessions_id?: number;
    flats_in_building?: number;
    deposit?: number;
    tenants_id?: number;
    createdAt?: string;
    updatedAt?: string;
    property_amenities?: IPropertyAmenity[];
    property_photos?: IPropertyPhoto[];
    interested_peoples?: any[];
    purpose?: IPurpose;
    home_type?: IHomeType;
    facing?: IFacing;
    flooring_type?: IFlooringType;
    ownership_type?: IOwnershipType;
    availability_type?: IAvailabilityType;
    furnishing?: IFurnishing;
    kitchen_type?: IKitchenType;
    water_supply?: IWaterSupply;
    power_backup?: IPowerBackup;
    possession?: IPossession;
    tenant?: ITenant;
    user?: IUser;
    saved_properties?: any[];
    agent_id?: number | null,
    builder_id?: number | null,
    builder?: IBuilder,
    agent_profile?: IAgent,
    price_on_demand?: boolean
}
export interface IPropertyListing {

    purposeId: number
    homeTypeId: number
    address: string
    landmark: string
    area: string
    pincode: string
    city: string
    state: string
    bedroomCount: number
    bathroomCount: number
    hallCount: number
    kitchenCount: number
    balconyCount: number
    builtUpArea: string
    carpetArea: string
    plotArea: string
    facingId: number
    propertyAge: string
    totalFloor: string
    propertyFloor: string
    flooringTypeId: number
    ownershipTypeId: number
    latitude: number
    longitude: number
    price: string
    negotiable: number
    maintenance: string
    currentlyUnderLoan: number
    availabilityTypeId: number
    furnishingsId: number
    parkingSlotTwoWheelerCount: number
    parkingSlotFourWheelerCount: number
    cupboard: number
    kitchenTypesId: number
    propertyDescription: string
    gatedSecurity: number
    gym: number
    waterSuppliesId: number
    powerBackupsId: number
    cornerProperty: number
    verifiedProperty: number
    agentCertification: number
    possessionsId: number
    flatsInBuilding: string
    deposit: string
    tenantsId: number


}



export interface IGetPropertyParams {
    view?: 'card' | 'full'
}

