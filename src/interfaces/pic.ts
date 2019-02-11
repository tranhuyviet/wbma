export interface Pic {
    file_id?: number;
    user_id: number;
    filename?: string;
    title?: string;
    description?: string;
    media_type?: string;
    mime_type?: string;
    time_added?: string;
    screenshot?: string;
    thumbnails?: object;
}

export interface IPicture {
    title: string;
    details: string;
    thumbnail: string;
    original: string;
  }
export interface IPicture2 {
    file_id: number;
    user_id: number;
    filename: string;
    filesize: number;
    title: string;
    description: string;
    media_type: string;
    mime_type: string;
    time_added: string;
    screenshot?: string;
    thumbnails?: Thumbnail;
  }

export interface Thumbnail {
    w160: string;
    w320?: string;
    w640?: string;
}

export interface User {
    user_id?: number;
    username: string;
    password?: string;
    password2?: string;
    email?: string;
    full_name?: string;
    data_created?: Date;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}

export interface UsernameResponse {
    username: string;
    available: string;
  }
  
export interface TagsResponse {
    file_id: number;
    tag: string;
    filename: string;
    user_id: number;
    description: string;
    filesize: number;
    mime_type: string;
    tag_id: number;
    time_added: string;
    title: string;
  }

export interface UploadForm {
    file?: File;
    description?: string;
    title?: string;
  }
