"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(user);
    return result;
});
const retrieveAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1 });
    return result;
});
const retrieveAnUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    const result = yield user_model_1.User.isUserExists(id);
    return result;
});
const updateAnUserIntoDB = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, { $set: data }, { new: true, runValidators: true });
    const resultWithoutOrders = result === null || result === void 0 ? void 0 : result.toObject();
    resultWithoutOrders === null || resultWithoutOrders === void 0 ? true : delete resultWithoutOrders.orders;
    return resultWithoutOrders;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield user_model_1.User.isUserExists(id)) {
        const result = yield user_model_1.User.deleteOne({ userId: id });
        return result;
    }
    return null;
});
const addOrderIntoUser = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield user_model_1.User.isUserExists(id)) {
        const result = yield user_model_1.User.updateOne({ userId: id }, { $push: { orders: order } });
        return result;
    }
    return null;
});
const retrieveAllOrdersForSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield user_model_1.User.isUserExists(id)) {
        const result = yield user_model_1.User.findOne({ userId: id }, { _id: 0, orders: 1 });
        return result;
    }
    return null;
});
const calculateOrdersTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(userId);
    if (yield user_model_1.User.isUserExists(id)) {
        const result = yield user_model_1.User.aggregate([
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
        return result;
    }
    return null;
});
exports.userServices = {
    createUserIntoDB,
    retrieveAllUserFromDB,
    retrieveAnUserFromDB,
    updateAnUserIntoDB,
    deleteUserFromDB,
    addOrderIntoUser,
    retrieveAllOrdersForSpecificUser,
    calculateOrdersTotalPrice,
};
