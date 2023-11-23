"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
});
const addressValidationSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: fullNameValidationSchema,
    age: zod_1.z.number().min(0),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean().default(false),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressValidationSchema,
    orders: zod_1.z.array(orderValidationSchema).default([]).optional(),
});
exports.default = userValidationSchema;
