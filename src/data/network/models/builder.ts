export interface IBuilder {
    id: number;
    background?: string | null;
    avatar?: string | null;
    name?: string | null;
    founded_date?: Date | null;
    employee_size?: number | string | null;
    website_link?: string | null;
    facebook_link?: string | null;
    instagram_link?: string | null;
    linkedin_link?: string | null;
    youtube_link?: string | null;
    about?: string | null;
    project_type_id?: number | null;
    createdAt: Date;
    updatedAt: Date;
    user_id: number;
}
