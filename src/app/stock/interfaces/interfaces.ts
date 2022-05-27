
export interface Office {
    _id?: string;
    name: string;
    email: string;
    address: string;
    isEnabled: boolean;
}

export interface OfficesDrop {
    name: string;
    code: string;
}

export interface Product {
    _id?: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    office: Office;
}

export interface ProductDb {
    _id?: string;
    name: string;
    price: number;
    description: string;
    stockOffices: [{
        office: string;
        stock: number;
    }]
}

export interface ArrayResp<T> {
    values: T[];
}