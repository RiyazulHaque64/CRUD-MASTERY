import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUser);
router.post('/', userControllers.createUser);
router.get('/:userId', userControllers.getAnUser);
router.put('/:userId', userControllers.updateAnUser);
router.delete('/:userId', userControllers.deleteUser);
router.put('/:userId/orders', userControllers.addOrder);
router.get('/:userId/orders', userControllers.getOrdersForSpecificUser);
router.get('/:userId/orders/total-price', userControllers.calculateTotalPrice);

export const userRoutes = router;
