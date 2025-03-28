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
import { UserService } from 'src/user/user.service';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
  },
})
export class EventsGateway implements OnModuleInit {

  constructor(private readonly userService: UserService) { }

  @WebSocketServer()
  server: Server;


  onModuleInit() {
    this.server.on('connection', (socket) => {
      socket.emit('welcome', { id: socket.id })

    })

    this.server.on('disconnect', (socket) => {

    })

    this.server.use((socket, next) => {
      const userId = socket.handshake.auth.userId;
      const sessionId = socket.handshake.auth.sessionId;
      if (!userId || !sessionId) {
        return next(new Error("Invalid Client."))
      }
      socket.data.userId = userId;
      socket.data.sessionId = sessionId;
      socket.join(userId)
      next()
    })
  }




  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string) {
    this.server.emit('onEvents')
  }

  @SubscribeMessage('change_user_status')
  changeUserStatus(@MessageBody() data: string) {
    this.server.emit('change_user_status',)
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

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() message: { destiny: string, text: string }, @ConnectedSocket() client: Socket): Promise<void> {
    try {
      console.log("sending msg to", message.
        text
      )
      this.server.to(client.data.userId).to(message.destiny).emit('receiveMessage', { message: message.text, userId: client.id, createdAt: DateTime.now() },)
    } catch (e) {
      console.log("erro ao sendMessage", e)
    }
  }

}