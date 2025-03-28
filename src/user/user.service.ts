import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Session } from 'src/sessions/entities/session.entity';
import { DateTime } from 'luxon';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const salt = await bcrypt.genSalt(10)
      createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
      return await this.userRepository.save(createUserDto);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    console.log("Trying request users in database")
    return this.userRepository.find();
  }

  async findOne(document: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { document: document } });
  }

  async login(email: string, password: string): Promise<User | undefined> {

    const user = await this.userRepository.findOne({ where: { email: email } })

    if (user) {
      if (bcrypt.compareSync(password, user?.password)) {
        return user
      }
    }

    return undefined;

  }

  async setSession(user: User, expire_at: number, session_id: string) {
    return await this.sessionRepository.save({ session_id: session_id, user_id: user.user_id, expire_at: DateTime.fromSeconds(expire_at).toJSDate() })
  }

  async findLastUserSession(user_id: string): Promise<Session | undefined> {
    return (await this.sessionRepository.find({ where: { user_id: user_id } })).pop()
  }

  async update(document: string, updateUserDto: UpdateUserDto): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { document: document } })
    if (user) {
      return await this.userRepository.save({ ...updateUserDto, id: user.user_id })
    }
    return undefined
  }

  async remove(user: User): Promise<void> {
    await this.userRepository.delete(user);

  }
}
