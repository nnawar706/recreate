export interface createUserParams {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
    clerkId: string;
}

export interface updateUserParams {
    username: string;
    firstName: string;
    lastName: string;
    photo: string;
}