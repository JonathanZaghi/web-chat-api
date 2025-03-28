import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, Res, HttpStatus, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import  * as uuid  from 'uuid';
import { DateTime } from 'luxon';



@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  @Post("/create-user")
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("/login")
  async login(@Req() request: Request, @Res() response: Response, @Body() userLogin: { email: string, password: string }) {
    try {

      console.log("Trying to retrive user: ", userLogin.email)

      const user = await this.userService.login(userLogin.email, userLogin.password)

      if (user) {
        const expire_at = (DateTime.now().toUnixInteger() + (3600 * 24));
        const session_id = uuid.v4();

        console.log('Trying to set User session: ', session_id, expire_at)

        await this.userService.setSession(user, expire_at, session_id)

        return response.json({ sessionId: session_id, name: user.name, document: user.document, role: user.role, userId: user.user_id, token: this.jwtService.sign({}, { secret: "SenhaMaisSeguraDoMundo@Matriz99", expiresIn: expire_at }) }).send();
      }

      return response.status(HttpStatus.NOT_FOUND).json({ message: "Usuario ou senha invalido!" }).send();

    } catch (e) {
      console.log(e)
    }

  }

  @Get()
  async findAll(): Promise<User[]> {

    console.log("Trying to retrive all users")

    return await this.userService.findAll();
  }

  @Get(':document')
  findOne(@Param('document') id: string) {

    return this.userService.findOne(id);

  }

  @Patch(':document')
  async update(@Res() response: Response, @Param('document') document: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(document, updateUserDto);

    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).send();
    }

    return response.send()
  }

  @Delete(':document')
  async remove(@Res() response: Response, @Param('document') document: string) {
    const user = await this.userService.findOne(document);

    if (user) {
      
      await this.userService.remove(user);

      return response.status(HttpStatus.NO_CONTENT).send();
    }

    response.status(HttpStatus.NOT_FOUND).send();

  }
}
