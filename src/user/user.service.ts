import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  user = [] as User[];

  async create(createUserDto: CreateUserDto[]) {
    createUserDto.forEach((user: CreateUserDto) => {
      const id = (this.user.length + 1).toString();
      this.user.push({ ...user, id });
    });
  }

  async findAll(): Promise<User[]> {
    return this.user;
  }

  async findOne(id: number): Promise<User> {
    return this.user[id];
  }

  async findOneByDocument(document: string): Promise<User | undefined> {
    return this.user.find((user) => user.document == document);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = this.user.find((user) => user.id == id)
    if (user) {
      const newUser: User = { ...user, ...updateUserDto, }
      this.user[this.user.indexOf(user)] = newUser;
      return newUser;
    }

    return undefined;

  }

  remove(document?: string) {
    const user = this.user.find((user) => user.document == document)
    if (user) {
      const index: number = this.user.indexOf(user)
      if (index) {
        this.user.splice(index, 1);
      }
    }
  }
}
