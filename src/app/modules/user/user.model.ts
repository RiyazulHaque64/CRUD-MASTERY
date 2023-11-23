import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

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

const userSchema = new Schema<TUser>({
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
    required: [true, 'An unique email is required!'],
    unique: true,
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

export const User = model<TUser>('User', userSchema);
