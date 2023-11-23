import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const validateUser = userValidationSchema.parse(user);
    const result = await userServices.createUserIntoDB(validateUser);
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

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.retrieveAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Users fetch was failed!',
      error: {
        code: 500,
        description: 'Users fetch was failed!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
};
