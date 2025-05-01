export interface IResponse<T> {
    message: string,
    success: boolean,
    data: T,
    meta?: IMeta
}

export interface IMeta {
    total: number
    page: number
    limit: number
    totalPages: number
}
