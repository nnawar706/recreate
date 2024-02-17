export interface createUserParams {
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    photo: string;
    clerkId: string;
}

export interface updateUserParams {
    username: string;
    firstname: string;
    lastname: string;
    photo: string;
}