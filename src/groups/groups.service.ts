import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { UserGroup } from './entities/user-group.entity';
import { urlToHttpOptions } from 'url';
import { UserGroupDto } from './dto/create-user-group.dto';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group) private groupRepository: Repository<Group>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserGroup) private userGroupRepository: Repository<UserGroup>,
  ) { }

  async create(createGroupDto: CreateGroupDto) {
    return await this.groupRepository.save(createGroupDto);
  }

  async addUserToGroup(userGroupDto: UserGroupDto) {
    const user = await this.userRepository.findOne({ where: { user_id: userGroupDto.user_id } })
    const group = await this.groupRepository.findOne({ where: { group_id: userGroupDto.group_id } })

    if (user && group) {
      return this.userGroupRepository.save({ user, group })
    } else {
      throw Error('Grupo ou Usuario não encontrado!')
    }
  }

  async findAll() {
    return await this.groupRepository.find();
  }

  async findOne(id: string) {
    return await this.groupRepository.findOne({ where: { group_id: id } });
  }

  async findGroupByUser(id: string) {
    return await this.groupRepository.createQueryBuilder("g")
      .select(['u.name', 'g.group_name'])
      .innerJoin('user_groups', 'ug', 'ug.group_id = g.group_id')
      .innerJoin('users', 'u', 'u.user_id = ug.user_id')
      .where('u.user_id = :user_id', { user_id: id }).getMany()


  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    return await this.groupRepository.save({ ...updateGroupDto, group_id: id })
  }

  remove(id: number) {
    return this.groupRepository.delete(id);
  }
}
