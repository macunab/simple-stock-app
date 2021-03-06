import { User, UserDto } from "src/app/auth/interfaces/interfaces";

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

export interface isOut {
    value: string;
    key: boolean;
}

export interface Movement {
    _id?: string;
    isOut: boolean;
    office: Office;
    user: User;
    note?: string;
    isConfirmed?: boolean;
    createdAt?: Date;
    products: [
        QuantityProduct
    ]
}

export interface MovementSave {
    _id?: string;
    isOut: boolean;
    office: Office;
    user: string;
    note?: string;
    isConfirmed?: boolean;
    createdAt?: Date;
    products: [
        QuantityProduct
    ]
}

export interface MovementDto {
    _id?: string;
    isOut: string;
    office: string;
    user: string;
    note?: string;
    isConfirmed?: boolean;
    createdAt?: Date;
    products: [ QuantityProduct ];
}

export interface QuantityProduct {
    product: string;
    quantity: number;
}

export interface ProductQuantity {
    product: Product;
    quantity: number;
    stock?: number;
}

export interface ProductStock {
    product: ProductDb;
    stock: number;
}

export interface ResForm<T> {
    ok: boolean;
    data: T;
}

export interface Document {
    _id?: string;
    isOut: boolean;
    office: Office;
    user: string;
    note?: string;
    isConfirmed?: boolean;
    createdAt?: Date;
    products: ProductQuantity[]
}

export interface DocumentDto {
    _id?: string;
    isOut: boolean;
    office: Office;
    user: UserDto;
    note?: string;
    isConfirmed?: boolean;
    createdAt?: Date;
    products: ProductQuantity[]
}