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
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = __importDefault(require("./user.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const validateUser = user_validation_1.default.parse(user);
        const result = yield user_service_1.userServices.createUserIntoDB(validateUser);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: 'User creation is failed',
            error: {
                code: 403,
                description: 'User creation is failed!',
            },
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userServices.retrieveAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Users fetch was failed!',
            error: {
                code: 500,
                description: 'Users fetch was failed!',
            },
        });
    }
});
const getAnUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.retrieveAnUserFromDB(userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User fetched successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found!',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User fetch was failed!',
            error: {
                code: 500,
                description: 'User fetch was failed!',
            },
        });
    }
});
const updateAnUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const data = req.body;
        const result = yield user_service_1.userServices.updateAnUserIntoDB(userId, data);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User updated successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found!',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User update was failed!',
            error: {
                code: 500,
                description: 'User update was failed!',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userServices.deleteUserFromDB(userId);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'User deleted successfully!',
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: 'User not found!',
                error: {
                    code: 404,
                    description: 'User not found!',
                },
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User delete was failed!',
            error: {
                code: 500,
                description: 'User delete was failed!',
            },
        });
    }
});
exports.userControllers = {
    createUser,
    getAllUser,
    getAnUser,
    updateAnUser,
    deleteUser,
};
