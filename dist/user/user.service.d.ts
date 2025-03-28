import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Session } from 'src/sessions/entities/session.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly sessionRepository;
    constructor(userRepository: Repository<User>, sessionRepository: Repository<Session>);
    create(createUserDto: CreateUserDto): Promise<User | null>;
    findAll(): Promise<User[]>;
    findOne(document: string): Promise<User | null>;
    login(email: string, password: string): Promise<User | undefined>;
    setSession(user: User, expire_at: number, session_id: string): Promise<{
        session_id: string;
        user_id: string;
        expire_at: Date;
    } & Session>;
    findLastUserSession(user_id: string): Promise<Session | undefined>;
    update(document: string, updateUserDto: UpdateUserDto): Promise<User | undefined>;
    remove(user: User): Promise<void>;
}
