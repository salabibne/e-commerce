// src/profiles/profile.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyProfile(@Req() req) {
    console.log("ProfileController",req.user);
    return req?.user;
  }
}
