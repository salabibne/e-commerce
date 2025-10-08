// src/admin/admin.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard) 
export class AdminController {
  @Get('dashboard')
  getAdminDashboard(@Req() req) {
    // AdminMiddleware already validated role
    return {
      message: `Welcome admin ${req.user.email}!`,
      role: req?.user?.role,
    };
  }
}
