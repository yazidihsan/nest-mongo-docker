import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
// import { LoginDto } from './dto/login-dto';
// import { RegisterDto } from './dto/register-dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    // const user = await this.authService.validateUser(email, username, password);
    // if (!user) {
    //   return { message: 'Invalid credentials' };
    // }
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}
