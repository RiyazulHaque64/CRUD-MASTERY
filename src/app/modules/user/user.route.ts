import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/', userControllers.getAllUser);
router.post('/', userControllers.createUser);

export const userRoutes = router;
