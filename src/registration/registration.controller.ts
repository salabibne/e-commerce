// src/registration/registration.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';

@Controller('register')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  async register(@Body() data:any) {
    return this.registrationService.register(data);
  }
}
