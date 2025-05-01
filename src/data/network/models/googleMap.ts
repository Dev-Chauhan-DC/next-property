export interface IGoogleSuggetion {
    predictions: IPrediction[]
    status: string
}

export interface IPrediction {
    description: string
    matched_substrings: IMatchedSubstring[]
    place_id: string
    reference: string
    structured_formatting: IStructuredFormatting
    terms: IPredictionTerm[]
    types: string[]
}

export interface IMatchedSubstring {
    length: number
    offset: number
}

export interface IStructuredFormatting {
    main_text: string
    main_text_matched_substrings: IMainTextMatchedSubstring[]
    secondary_text: string
}

export interface IMainTextMatchedSubstring {
    length: number
    offset: number
}

export interface IPredictionTerm {
    offset: number
    value: string
}


export interface IPlaceDetails {
    html_attributions?: any[];
    result: IResult;
    status?: string;
}

export interface IResult {
    address_components?: IAddressComponent[];
    adr_address?: string;
    formatted_address: string;
    geometry: IGeometry;
    icon?: string;
    icon_background_color?: string;
    icon_mask_base_uri?: string;
    name?: string;
    photos?: IPhoto[];
    place_id?: string;
    reference?: string;
    types?: string[];
    url?: string;
    utc_offset?: number;
    vicinity?: string;
    website?: string;
}

export interface IAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

export interface IGeometry {
    location: ILocation;
    viewport: IViewport;
}

export interface ILocation {
    lat: number;
    lng: number;
}

export interface IViewport {
    northeast: INortheast;
    southwest: ISouthwest;
}

export interface INortheast {
    lat: number;
    lng: number;
}

export interface ISouthwest {
    lat: number;
    lng: number;
}

export interface IPhoto {
    height: number;
    html_attributions: string[];
    photo_reference: string;
    width: number;
}
