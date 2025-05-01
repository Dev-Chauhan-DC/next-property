export interface IMealBulkCreateParam {
    propertyId: number,
    ids: number[]
}



export interface IMeal {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface IPropertyMeals {
    id: number
    property_id: number
    meal_type_id: number
    createdAt: string
    updatedAt: string
    meal_types: IMeal
}
