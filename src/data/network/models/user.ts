import { IUserRole } from "./property"


export interface IUpdateUser {
    email?: string
    firstName?: string
    lastName?: string
    secondaryNumber?: string
    aadhaarNumber?: string
    avatar?: string
    agencyName?: string
    companyName?: string
}

export interface IVerifyOtp {
    dataValues: IUser
    _previousDataValues: PreviousDataValues
    uniqno: number
    _changed: Changed
    _options: Options
    isNewRecord: boolean
    token: string
}

export interface IUser {
    id?: number
    phone_number?: string
    email?: string
    user_roles_id?: number
    first_name?: string
    last_name?: string
    secondary_number?: string
    aadhaar_number?: string
    avatar?: any
    password?: any
    agency_name?: string
    company_name?: any
    is_subscription_active?: number
    createdAt?: string
    updatedAt?: string
    user_role?: IUserRole;
}

export interface PreviousDataValues {
    id: number
    phone_number: string
    email: string
    user_roles_id: number
    first_name: string
    last_name: string
    secondary_number: string
    aadhaar_number: string
    avatar: any
    password: any
    agency_name: string
    company_name: any
    is_subscription_active: number
    createdAt: string
    updatedAt: string
}

export interface Changed { }

export interface Options {
    isNewRecord: boolean
    _schema: any
    _schemaDelimiter: string
    raw: boolean
    attributes: string[]
}
