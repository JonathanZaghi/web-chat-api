import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
export declare class EventsGateway implements OnModuleInit {
    private readonly userService;
    constructor(userService: UserService);
    server: Server;
    onModuleInit(): void;
    handleEvent(data: string): void;
    changeUserStatus(data: string): void;
    joinGroup(payLoad: {
        group: string;
    }, client: Socket): void;
    leaveGroup(payLoad: {
        group: string;
    }, client: Socket): void;
    identity(data: number): Promise<number>;
    sendMessage(message: {
        destiny: string;
        text: string;
    }, client: Socket): Promise<void>;
}
