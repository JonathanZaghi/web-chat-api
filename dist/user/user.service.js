"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor() {
        this.user = [];
    }
    async create(createUserDto) {
        createUserDto.forEach((user) => {
            const id = (this.user.length + 1).toString();
            this.user.push({ ...user, id });
        });
    }
    async findAll() {
        return this.user;
    }
    async findOne(id) {
        return this.user[id];
    }
    async findOneByDocument(document) {
        return this.user.find((user) => user.document == document);
    }
    async update(id, updateUserDto) {
        const user = this.user.find((user) => user.id == id);
        if (user) {
            const newUser = { ...user, ...updateUserDto, };
            this.user[this.user.indexOf(user)] = newUser;
            return newUser;
        }
        return undefined;
    }
    remove(document) {
        const user = this.user.find((user) => user.document == document);
        if (user) {
            const index = this.user.indexOf(user);
            if (index) {
                this.user.splice(index, 1);
            }
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map