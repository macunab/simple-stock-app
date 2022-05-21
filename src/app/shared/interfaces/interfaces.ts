
export interface Column<T> {
    field: keyof T;
    title: string;
}

export interface Row<T> {
    values: T;
}

export interface GenericTableEvent<T> {
    data: T;
    type: string;
}

export interface ButtonSettings {
    title?: string;
    class: string;
    functionType: string; 
    icon?: string;
    tooltipText?: string;
}