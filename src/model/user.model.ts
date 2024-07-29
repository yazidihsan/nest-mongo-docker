// import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { Transform } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class User extends Document {
  // @Transform(({ value }) => value.toString())
  // @Prop()
  // _id: string;

  // @Prop({ unique: [true, 'Duplicate email entered'] })
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  interests: string[];

  @Prop()
  // @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// export const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   username: { type: String, required: true },
//   name: { type: String },
//   birthday: { type: String },
//   horoscope: { type: String },
//   height: { type: Number },
//   weight: { type: Number },
//   interests: [{ type: String }],
// });

// export interface User extends mongoose.Document {
//   email: string;
//   username: string;
//   password: string;
//   name: string;
//   birthday: string;
//   zodiac: string;
//   horoscope: string;
//   height: number;
//   weight: number;
//   interests: string[];
// }
