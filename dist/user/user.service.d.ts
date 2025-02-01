import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    user: User[];
    create(createUserDto: CreateUserDto[]): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findOneByDocument(document: string): Promise<User | undefined>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<User | undefined>;
    remove(document?: string): void;
}
