export interface IUser {
    name: string;
    email: string;
    _id: string;
    isActivated: boolean;
    isBlocked: boolean;
    registrationDate: Date;
    lastLoginDate: Date;
}