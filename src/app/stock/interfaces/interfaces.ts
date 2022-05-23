
export interface Office {
    _id?: string;
    name: string;
    email: string;
    address: string;
    isEnabled: boolean;
}

export interface ArrayResp<T> {
    values: T[];
}