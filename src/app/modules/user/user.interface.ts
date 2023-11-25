import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders?: Array<TOrder | []>;
}

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
}
