export interface IHighlighBulkCreateParam {
    propertyId: number,
    ids: number[]
}



export interface IHighlight {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export interface IPropertyHighlights {
    id: number
    property_id: number
    highlight_id: number
    createdAt: string
    updatedAt: string
    highlight: IHighlight
}
