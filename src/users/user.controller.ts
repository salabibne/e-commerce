import { Controller, Post, Body, Get,Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
    async getUser(@Query('email') email: string) {
    return this.userService.findByEmail(email);
    }

  
}
