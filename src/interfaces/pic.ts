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
    thumbnails?: string;
}

export interface Thumbnail {
    160: string;
    320: string;
    640: string;
}
