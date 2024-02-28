export interface checkoutTransactionParams {
    plan: string;
    credits: number;
    amount: number;
    buyerId: string;
}

export interface createTransactionParams {
    stripeId: string;
    amount: number;
    credits: number;
    plan: string;
    buyerId: string;
    createdAt: Date;
}

export interface checkoutParams {
    plan: string;
    amount: number;
    credits: number;
    buyerId: string;
}