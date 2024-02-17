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
    params: { id: string; type: TransformationTypeKey };
    searchParams: { [key: string]: string | string[] | undefined };
}