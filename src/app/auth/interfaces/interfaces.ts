export interface User {
    uid: string;
    name: string;
    permissions: string;
}

export interface ServerResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    msg?: string;
    token?: string;
    permissions?: string;
    // add office? update the backend res
}