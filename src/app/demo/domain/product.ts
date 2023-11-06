export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}

export interface User {
    id?: string;
    full_name?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    gender?: string
    is_active?: boolean;
}

// export class Users {
//
//     constructor(
//         public id: string,
//         public full_name: string,
//         public email: string,
//         public phone: string,
//         public username: string,
//         public gender: string,
//         public is_active: boolean
//     ) {
//     }
// }
