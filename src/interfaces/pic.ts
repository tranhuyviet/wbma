export interface Pic {
    file_id: number;
    user_id: number;
    filename: string;
    title: string;
    description: string;
    media_type: string;
    mime_type: string;
    time_added: string;
    screenshot?: string;
    thumbnails?: object;
}

export interface User {
    user_id?: number;
    username: string;
    password?: string;
    email?: string;
    full_name?: string;
    time_create?: Date;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}
