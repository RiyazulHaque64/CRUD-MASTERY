import { TOrder, TUser } from './user.interface';
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
  const id = Number(userId);
  const result = await User.isUserExists(id);
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
  const id = Number(userId);
  if (await User.isUserExists(id)) {
    const result = await User.deleteOne({ userId: id });
    return result;
  }
  return null;
};

const addOrderIntoUser = async (userId: string, order: TOrder) => {
  const id = Number(userId);
  if (await User.isUserExists(id)) {
    const result = await User.updateOne(
      { userId: id },
      { $push: { orders: order } },
    );
    return result;
  }
  return null;
};

const retrieveAllOrdersForSpecificUser = async (userId: string) => {
  const id = Number(userId);
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id }, { _id: 0, orders: 1 });
    return result;
  }
  return null;
};

const calculateOrdersTotalPrice = async (userId: string) => {
  const id = Number(userId);
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      {
        $match: { userId: id },
      },
      {
        $unwind: '$orders',
      },
      {
        $group: {
          _id: '$_id',
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $project: { _id: 0 },
      },
    ]);
    return result[0];
  }
  return null;
};

export const userServices = {
  createUserIntoDB,
  retrieveAllUserFromDB,
  retrieveAnUserFromDB,
  updateAnUserIntoDB,
  deleteUserFromDB,
  addOrderIntoUser,
  retrieveAllOrdersForSpecificUser,
  calculateOrdersTotalPrice,
};
