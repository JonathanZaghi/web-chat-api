import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { DateTime } from 'luxon';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  private users = [] as string[];
  @WebSocketServer()
  server: Server;


  onModuleInit() {
    this.server.on('connection', (socket) => {
      socket.emit('welcome', { id: socket.id })
    })
  }
  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('onEvents')
  }

  @SubscribeMessage('joinGroup')
  joinGroup(@MessageBody() payLoad: { group: string }, @ConnectedSocket() client: Socket): void {
    try {
      client.join(payLoad.group);
      console.log(`${client.id} entrou no grupo ${payLoad.group}`);
    } catch (e) {
      console.log("Deu erro para dar join")
    }
  }

  @SubscribeMessage('leaveGroup')
  leaveGroup(@MessageBody() payLoad: { group: string }, @ConnectedSocket() client: Socket): void {
    try {
      console.log(`${client.id} entrou no grupo ${payLoad.group}`);
    } catch (e) {
      console.log("Deu erro para dar join")
    }
  }


  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('friends')
  onFriendSMessage() {
    this.server.emit('onFriendSMessage', this.users)
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() message: { destiny: string, text: string, senderId: string }, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      console.log("sending msg to", message.destiny)
      this.server.to(message.destiny).emit('receiveMessage', { message: message.text, userId: client.id, createdAt: DateTime.now() },)
    } catch (e) {
      console.log("erro ao sendMessage", e)
    }
  }

}