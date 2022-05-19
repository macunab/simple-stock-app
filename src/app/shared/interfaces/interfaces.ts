
export interface TableHeader {
    field: string;
    name: string;
}

export interface ButtonSettings {
    title: string;
    class: string;
    functionType: string; 
    icon?: string;
}

export interface TableEvent {
    data: any;
    type: string;
}