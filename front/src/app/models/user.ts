export class User {
    id: number | undefined;
    name!: string;
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    photo?: File; 
}
