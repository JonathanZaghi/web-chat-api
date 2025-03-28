import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class UserController {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User | null>;
    login(request: Request, response: Response, userLogin: {
        email: string;
        password: string;
    }): Promise<Response<any, Record<string, any>> | undefined>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    update(response: Response, document: string, updateUserDto: UpdateUserDto): Promise<Response<any, Record<string, any>>>;
    remove(response: Response, document: string): Promise<Response<any, Record<string, any>> | undefined>;
}
