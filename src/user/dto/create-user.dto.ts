import { RoleType } from "../entities/user.entity";

export class CreateUserDto {
    name: string;
    age: number;
    password:string;
    document: string;
    role: RoleType;
    email:string
}
