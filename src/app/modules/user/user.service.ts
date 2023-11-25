import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const retrieveAllUserFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const retrieveAnUserFromDB = async (userId: string) => {
  const result = await User.isUserExists(userId);
  return result;
};

const updateAnUserIntoDB = async (userId: string, data: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: data },
    { new: true, runValidators: true },
  );
  return result;
};

const deleteUserFromDB = async (userId: string) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  }
  return null;
};

export const userServices = {
  createUserIntoDB,
  retrieveAllUserFromDB,
  retrieveAnUserFromDB,
  updateAnUserIntoDB,
  deleteUserFromDB,
};
