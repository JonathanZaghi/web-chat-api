import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserGroup } from "./user-group.entity";

@Entity({ name: 'groups' })
export class Group {

    @PrimaryGeneratedColumn('uuid')
    group_id: string;

    @Column()
    group_name:string;

    @ManyToMany(() => UserGroup , (userGroup) => userGroup.user)
    userGroups: UserGroup[]
}
