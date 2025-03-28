"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const luxon_1 = require("luxon");
const socket_io_1 = require("socket.io");
const user_service_1 = require("../user/user.service");
let EventsGateway = class EventsGateway {
    constructor(userService) {
        this.userService = userService;
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            socket.emit('welcome', { id: socket.id });
        });
        this.server.on('disconnect', (socket) => {
        });
        this.server.use((socket, next) => {
            const userId = socket.handshake.auth.userId;
            const sessionId = socket.handshake.auth.sessionId;
            if (!userId || !sessionId) {
                return next(new Error("Invalid Client."));
            }
            socket.data.userId = userId;
            socket.data.sessionId = sessionId;
            socket.join(userId);
            next();
        });
    }
    handleEvent(data) {
        this.server.emit('onEvents');
    }
    changeUserStatus(data) {
        this.server.emit('change_user_status');
    }
    joinGroup(payLoad, client) {
        try {
            client.join(payLoad.group);
            console.log(`${client.id} entrou no grupo ${payLoad.group}`);
        }
        catch (e) {
            console.log("Deu erro para dar join");
        }
    }
    leaveGroup(payLoad, client) {
        try {
            console.log(`${client.id} entrou no grupo ${payLoad.group}`);
        }
        catch (e) {
            console.log("Deu erro para dar join");
        }
    }
    async identity(data) {
        return data;
    }
    async sendMessage(message, client) {
        try {
            console.log("sending msg to", message.
                text);
            this.server.to(client.data.userId).to(message.destiny).emit('receiveMessage', { message: message.text, userId: client.id, createdAt: luxon_1.DateTime.now() });
        }
        catch (e) {
            console.log("erro ao sendMessage", e);
        }
    }
};
exports.EventsGateway = EventsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], EventsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('events'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "handleEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('change_user_status'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "changeUserStatus", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGroup'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "joinGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveGroup'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], EventsGateway.prototype, "leaveGroup", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('identity'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "identity", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], EventsGateway.prototype, "sendMessage", null);
exports.EventsGateway = EventsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(81, {
        cors: {
            origin: '*',
            methods: '*',
            allowedHeaders: '*',
        },
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], EventsGateway);
//# sourceMappingURL=events.gateway.js.map