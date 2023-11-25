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
router.get('/:userId', user_controller_1.userControllers.getAnUser);
router.post('/', user_controller_1.userControllers.createUser);
router.put('/:userId', user_controller_1.userControllers.updateAnUser);
router.delete('/:userId', user_controller_1.userControllers.deleteUser);
exports.userRoutes = router;
