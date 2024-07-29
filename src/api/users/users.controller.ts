import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  // UseInterceptors,
  // UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from 'src/model/user.model';
import { CreateUserDto } from './dto/create-user-dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
// import MongooseClassSerializerInterceptor from 'src/config/mongooseClassSerializer.interceptor';
// import MongooseClassSerializerInterceptor from 'src/config/mongooseClassSerializer.interceptor';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/createProfile')
  async createOneUser(@Body() createProfile: CreateUserDto): Promise<User> {
    const { name, birthday, height, weight, interests } = createProfile;
    try {
      const result = await this.usersService.createProfile(
        name,
        birthday,
        height,
        weight,
        interests,
      );
      return result;
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  // @UseInterceptors(MongooseClassSerializerInterceptor)
  @Get('/getProfile')
  async getAllUsers() {
    try {
      return await this.usersService.getProfile();
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/updateProfile')
  async updateUser(@Body() updateUser: UpdateUserDto): Promise<User> {
    const { ...updateData } = updateUser;
    try {
      return await this.usersService.updateProfile(updateData);
    } catch (error) {
      throw new ExceptionsHandler(error);
    }
  }
}
