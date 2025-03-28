import { Group } from "src/groups/entities/group.entity";
import { UserGroup } from "src/groups/entities/user-group.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

export enum RoleType {
    ADMIN = 'admin',
    empoloyee = 'employee',
    customer = 'customer',
}
@Entity({ name: 'users' })
@Unique(['document'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    name: string;

    @Column({ type: 'enum', enumName: 'role_types', enum: RoleType, default: RoleType.customer })
    role: RoleType;

    @Column()
    document: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => UserGroup, (userGroup) => userGroup.group)
    userGroups: UserGroup[]

    @OneToMany(() => Session, (session) => session)
    @JoinColumn()
    session: Session;
}






