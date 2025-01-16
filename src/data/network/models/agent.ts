export interface IAgent {
    id: number;
    background?: string | null;
    avatar?: string | null;
    name?: string | null;
    experience_year?: number | null;
    employee_size?: string | number | null;
    website_link?: string | null;
    facebook_link?: string | null;
    instagram_link?: string | null;
    linkedin_link?: string | null;
    youtube_link?: string | null;
    contact_number?: string | null;
    about?: string | null;
    createdAt: Date;
    updatedAt: Date;
    user_id: number;
}