import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnModuleInit {
    private users;
    server: Server;
    onModuleInit(): void;
    handleEvent(data: string): void;
    joinGroup(payLoad: {
        group: string;
    }, client: Socket): void;
    leaveGroup(payLoad: {
        group: string;
    }, client: Socket): void;
    identity(data: number): Promise<number>;
    onFriendSMessage(): void;
    sendMessage(message: {
        destiny: string;
        text: string;
        senderId: string;
    }, client: Socket): Promise<void>;
}
