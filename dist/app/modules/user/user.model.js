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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const fullNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!'],
    },
});
const addressSchema = new mongoose_1.Schema({
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
const orderSchema = new mongoose_1.Schema({
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
const userSchema = new mongoose_1.Schema({
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
// Password Hashing
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.salt_rounds));
    });
});
// Hide Password
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};
userSchema.statics.isUserExists = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.User.findOne({ userId }, { orders: 0 });
        return result;
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
