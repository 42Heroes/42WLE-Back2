import { Controller, forwardRef, Get, Inject, Query } from '@nestjs/common';
import { LoginProducer } from '../bull-queue/login/login.producer';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly authService: AuthService,
    private readonly loginQueue: LoginProducer,
  ) {}

  @Get('/social/42')
  getMe(@Query('code') code: string) {
    const accessToken = this.authService.getAccessToken(code);
    const fortyTwoDto = this.loginQueue.addjob(accessToken);
    return this.authService.fortyTwoLogin(fortyTwoDto);
  }
}
