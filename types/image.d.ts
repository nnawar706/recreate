export interface addImageParams {
    image: {
        title: string;
        publicId: string;
        transformationType: string;
        width: number;
        height: string;
        config: any;
        secureURL: string;
        transformationURL: string;
        aspectRatio: string | undefined;
        prompt: string | undefined;
        color: string | undefined;
    };
    userId: string;
    path: string;
}

export interface updateImageParams {
    image: {
        _id: string;
        title: string;
        publicId: string;
        transformationType: string;
        width: number;
        height: string;
        config: any;
        secureURL: string;
        transformationURL: string;
        aspectRatio: string | undefined;
        prompt: string | undefined;
        color: string | undefined;
    };
    userId: string;
    path: string;
}

export interface collection {
    images: any;
    totalPages?: number;
    page: number;
    hasSearch?: boolean;
}

export interface getAllImageParams {
    limit?: number;
    page?: number;
    query?: string;
}