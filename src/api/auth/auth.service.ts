import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/user.model';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
// import { RegisterDto } from './dto/register-dto';
// import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { email, username, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });
    await user.save();
    return {
      message: 'User created successfully',
      //   result: this.login(user),
    };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, username, password } = loginDto;
    const user = await this.userModel.findOne({ email, username });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: user._id });
    return {
      access_token,
    };
  }
}

//   async validateUser(
//     email: string,
//     username: string,
//     pass: string,
//   ): Promise<any> {
//     const user = await this.userModel.findOne({ email, username });
//     if (user && (await bcrypt.compare(pass, user.password))) {
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }
// }
