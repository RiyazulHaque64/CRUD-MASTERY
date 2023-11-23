import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await userServices.createUserIntoDB(user);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: 'User creation is failed',
      error: {
        code: 403,
        description: 'User creation is failed!',
      },
    });
  }
};

export const userControllers = {
  createUser,
};
