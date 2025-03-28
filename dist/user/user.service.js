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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const session_entity_1 = require("../sessions/entities/session.entity");
const luxon_1 = require("luxon");
let UserService = class UserService {
    constructor(userRepository, sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
    }
    async create(createUserDto) {
        try {
            const salt = await bcrypt.genSalt(10);
            createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
            return await this.userRepository.save(createUserDto);
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
    async findAll() {
        console.log("Trying request users in database");
        return this.userRepository.find();
    }
    async findOne(document) {
        return this.userRepository.findOne({ where: { document: document } });
    }
    async login(email, password) {
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (user) {
            if (bcrypt.compareSync(password, user?.password)) {
                return user;
            }
        }
        return undefined;
    }
    async setSession(user, expire_at, session_id) {
        return await this.sessionRepository.save({ session_id: session_id, user_id: user.user_id, expire_at: luxon_1.DateTime.fromSeconds(expire_at).toJSDate() });
    }
    async findLastUserSession(user_id) {
        return (await this.sessionRepository.find({ where: { user_id: user_id } })).pop();
    }
    async update(document, updateUserDto) {
        const user = await this.userRepository.findOne({ where: { document: document } });
        if (user) {
            return await this.userRepository.save({ ...updateUserDto, id: user.user_id });
        }
        return undefined;
    }
    async remove(user) {
        await this.userRepository.delete(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(session_entity_1.Session)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map