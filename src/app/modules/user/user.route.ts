import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getAnUser);
router.post('/', userControllers.createUser);
router.put('/:userId', userControllers.updateAnUser);
router.delete('/:userId', userControllers.deleteUser);

export const userRoutes = router;
