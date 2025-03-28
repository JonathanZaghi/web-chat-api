import { Module } from '@nestjs/common';
import { Session } from "src/sessions/entities/session.entity";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService, JwtService]
})
export class UserModule { }
