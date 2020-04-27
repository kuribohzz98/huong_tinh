export interface IPageOptions {
    limit?: number;
    page?: number
}

export interface ParkingAttribute {
    id?: number;
    position?: number;
    status?: string;
    timeOut?: Date;
    cost?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserAttribute {
    id?: number;
    username?: string;
    password?: string;
    roleId?: number;
    salt?: string;
    iterations?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoleAttribute {
    id?: number;
    name?: string;
    code?: string;
}