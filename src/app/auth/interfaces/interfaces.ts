import { Office } from "src/app/stock/interfaces/interfaces";

export interface User {
    uid: string;
    name: string;
    permissions: string;
    office?: Office;
}

export interface UserDto {
    _id?: string;
    name: string;
    email: string;
    isActive?: boolean;
    password?: string;
    office?: Office; 
}

export interface ServerResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    msg?: string;
    token?: string;
    permissions?: string;
    office?: Office;
    // add office? update the backend res
}