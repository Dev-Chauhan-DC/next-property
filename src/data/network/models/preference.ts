export interface IPreferenceBulkCreateParam {
    propertyId: number,
    ids: number[]
}


export interface IPreference {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface IPropertyPreferences {
    id: number
    property_id: number
    preference_id: number
    createdAt: string
    updatedAt: string
    preference: IPreference
}
