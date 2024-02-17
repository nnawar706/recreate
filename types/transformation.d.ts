export interface transformationFormProps {
    action: "Add" | "Update";
    userId: string;
    type: "restore" | "fill" | "remove" | "recolor" | "removeBackground";
    remainingCredit: number;
    data?: IImage | null;
    config?: trasformations | null;
};

export interface transformations {
    restore?: boolean;
    fillBackground?: boolean;
    remove?: {
        prompt: string;
        removeShadow?: boolean;
        multiple?: boolean;
    };
    recolor?: {
        prompt?: string;
        to: string;
        multiple?: boolean;
    };
    removeBackground?: boolean;
};