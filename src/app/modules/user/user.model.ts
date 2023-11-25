import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
  },
});

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street address is required!'],
  },
  city: {
    type: String,
    required: [true, 'City name is required!'],
  },
  country: {
    type: String,
    required: [true, 'Country name is required!'],
  },
});

const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required!'],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'An unique user id is required!'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User name must be required!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password must be required!'],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, 'Age is required!'],
    min: 0,
  },
  email: {
    type: String,
    required: [true, 'Email is required!'],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
  },
  address: addressSchema,
  orders: {
    type: [orderSchema],
    default: [],
  },
});

// Password Hashing
userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
});

// Hide Password
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.statics.isUserExists = async function (userId: number) {
  const result = await User.findOne({ userId }, { orders: 0 });
  return result;
};

export const User = model<TUser, UserModel>('User', userSchema);
