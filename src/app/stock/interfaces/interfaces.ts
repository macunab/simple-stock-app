
export interface Office {
    name: string;
    email: string;
    address: string;
    isEnabled: boolean;
}

export interface ArrayResp<T> {
    values: T[];
}