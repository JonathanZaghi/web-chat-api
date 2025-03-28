import { UserGroup } from "src/groups/entities/user-group.entity";
import { Session } from "src/sessions/entities/session.entity";
export declare enum RoleType {
    ADMIN = "admin",
    empoloyee = "employee",
    customer = "customer"
}
export declare class User {
    user_id: string;
    name: string;
    role: RoleType;
    document: string;
    email: string;
    password: string;
    userGroups: UserGroup[];
    session: Session;
}
