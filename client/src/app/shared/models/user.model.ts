export interface Login {
    username: string;
    password: string;
    role?: string;
}

export interface IUser {
    id?: number;
    username?: string;
    role?: string;
    roleId?: number;
}

export interface IUserPage extends IUser {
    page?: number;
    limit?: number;
}

export type JwtToken = {
    access_token: string;
    user: IUser;
};