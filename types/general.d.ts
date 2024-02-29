declare type TransformationTypeKey =
    | "restore"
    | "fill"
    | "remove"
    | "recolor"
    | "removeBackground";

export interface createUrlQueryParams {
    searchParams: string;
    key: string;
    value: string | number | null;
}

export interface urlQueryParams {
    params: string;
    key: string;
    value: string | null;
};

export interface removeUrlQueryParams {
    searchParams: string;
    keysToRemove: string[];
};

export interface searchParamProps {
    params: { 
        id: string; 
        type: TransformationTypeKey;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export interface transformationHeader {
    title: string;
    subtitle?: string;
}

export interface imageUploaderProps {
    onValueChange: (value: string) => void;
    setImage: React.Dispatch<any>;
    publicId: string;
    image: any;
    type: string;
    credit: number;
}

export interface collectionParams {
    images: IImage[];
    totalPages: number;
    page: number;
    hasSearch?: boolean;
}