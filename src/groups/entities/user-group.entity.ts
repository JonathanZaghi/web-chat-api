import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';


@Entity('user_groups')
export class UserGroup {
  @PrimaryGeneratedColumn('uuid')
  user_groups_id: string;
  
  @ManyToOne(() => User, (user) => user.userGroups, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Group, (group) => group.userGroups, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'group_id' }) 
  group: Group;
}
