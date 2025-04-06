import { Request, RequestHandler, Response } from 'express';
import { UniteServices } from './unit.service';

const createUnit = async (req: Request, res: Response) => {
  try {
    const result = await UniteServices.createUnitIntoDB(req.body);

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Unit created successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error creating unit:', error);
    return res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Failed to create unit',
      error: error.message,
    });
  }
};

const updateUnit = async (req, res): RequestHandler => {};

const getAllUnits = async (req, res): RequestHandler => {};

const getSingleUnit = async (req, res): RequestHandler => {};

export const UnitControllers = {
  createUnit,
  updateUnit,
  getAllUnits,
  getSingleUnit,
};
