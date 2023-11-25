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

const getAnUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.retrieveAnUserFromDB(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User fetch was failed!',
      error: {
        code: 500,
        description: 'User fetch was failed!',
      },
    });
  }
};

const updateAnUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const data = req.body;
    const result = await userServices.updateAnUserIntoDB(userId, data);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User update was failed!',
      error: {
        code: 500,
        description: 'User update was failed!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.deleteUserFromDB(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User delete was failed!',
      error: {
        code: 500,
        description: 'User delete was failed!',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const order = req.body;
    const result = await userServices.addOrderIntoUser(userId, order);
    if (result) {
      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order creation was failed!',
      error: {
        code: 500,
        description: 'Order creation was failed!',
      },
    });
  }
};

const getOrdersForSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.retrieveAllOrdersForSpecificUser(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Order fetched was failed!',
      error: {
        code: 500,
        description: 'Order fetched was failed!',
      },
    });
  }
};

const calculateTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await userServices.calculateOrdersTotalPrice(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Total price calculation was failed!',
      error: {
        code: 500,
        description: 'Total price calculation was failed!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getAnUser,
  updateAnUser,
  deleteUser,
  addOrder,
  getOrdersForSpecificUser,
  calculateTotalPrice,
};
