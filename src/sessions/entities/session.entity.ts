import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'sessions' })
export class Session {

    @PrimaryGeneratedColumn('uuid')
    session_id: string;

    @Column()
    user_id:string

    @Column('timestamp')
    expire_at: Date;

}