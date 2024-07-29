import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../model/user.model';
// import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createProfile(
    name: string,
    birthday: string,
    height: number,
    weight: number,
    interests: string[],
  ): Promise<User> {
    const createdUser = this.userModel.create({
      name,
      birthday,
      height,
      weight,
      interests,
    });
    return (await createdUser).save();
  }
  async updateProfile(updateData: Partial<User>): Promise<User> {
    await this.userModel.updateOne({ $set: updateData }).exec();

    return this.userModel.findOne().exec();
  }

  async getProfile(): Promise<User> {
    const datas = await this.userModel.find();

    const data = datas.at(datas.length - 1);

    return data;
  }

  async getUserById(userId: string): Promise<any> {
    const users = await this.userModel.find();
    const user = users.at(users.length - 1);
    userId = user._id.toString();
    return userId;
  }
}
