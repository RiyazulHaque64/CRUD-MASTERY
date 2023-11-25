"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.userControllers.getAllUser);
router.post('/', user_controller_1.userControllers.createUser);
router.get('/:userId', user_controller_1.userControllers.getAnUser);
router.put('/:userId', user_controller_1.userControllers.updateAnUser);
router.delete('/:userId', user_controller_1.userControllers.deleteUser);
router.put('/:userId/orders', user_controller_1.userControllers.addOrder);
router.get('/:userId/orders', user_controller_1.userControllers.getOrdersForSpecificUser);
router.get('/:userId/orders/total-price', user_controller_1.userControllers.calculateTotalPrice);
exports.userRoutes = router;
