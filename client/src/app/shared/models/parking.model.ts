export interface IParking {
    id?: number;
    position?: number;
    status?: string;
    timeOut?: Date;
    cost?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IParkingPage extends IParking {
    page?: number;
    limit?: number;
}