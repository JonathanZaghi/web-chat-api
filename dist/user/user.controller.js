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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_1 = require("@nestjs/jwt");
const uuid = require("uuid");
const luxon_1 = require("luxon");
let UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    async login(request, response, userLogin) {
        try {
            console.log("Trying to retrive user: ", userLogin.email);
            const user = await this.userService.login(userLogin.email, userLogin.password);
            if (user) {
                const expire_at = (luxon_1.DateTime.now().toUnixInteger() + (3600 * 24));
                const session_id = uuid.v4();
                console.log('Trying to set User session: ', session_id, expire_at);
                await this.userService.setSession(user, expire_at, session_id);
                return response.json({ sessionId: session_id, name: user.name, document: user.document, role: user.role, userId: user.user_id, token: this.jwtService.sign({}, { secret: "SenhaMaisSeguraDoMundo@Matriz99", expiresIn: expire_at }) }).send();
            }
            return response.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Usuario ou senha invalido!" }).send();
        }
        catch (e) {
            console.log(e);
        }
    }
    async findAll() {
        console.log("Trying to retrive all users");
        return await this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    async update(response, document, updateUserDto) {
        const user = await this.userService.update(document, updateUserDto);
        if (!user) {
            return response.status(common_1.HttpStatus.NOT_FOUND).send();
        }
        return response.send();
    }
    async remove(response, document) {
        const user = await this.userService.findOne(document);
        if (user) {
            await this.userService.remove(user);
            return response.status(common_1.HttpStatus.NO_CONTENT).send();
        }
        response.status(common_1.HttpStatus.NOT_FOUND).send();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("/create-user"),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':document'),
    __param(0, (0, common_1.Param)('document')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':document'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('document')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':document'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('document')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map