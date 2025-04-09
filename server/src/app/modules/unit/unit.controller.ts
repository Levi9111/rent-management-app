import { UniteServices } from './unit.service';
import { catchAsync } from '../../utils/catrchAsync';

const createUnit = catchAsync(async (req, res) => {
  const result = await UniteServices.createUnitIntoDB(req.body.unit);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Unit created successfully',
    data: result,
  });
});

const updateUnit = catchAsync(async (req, res) => {
  const result = await UniteServices.updateUnitIntoDB(
    req.params.id,
    req.body.unit,
  );

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Unit updated successfully',
    data: result,
  });
});

const getAllUnits = catchAsync(async (req, res) => {
  const result = await UniteServices.getAllUnitsFromDB(req.query);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'All Units fetched successfully',
    data: result,
  });
});

const getSingleUnit = catchAsync(async (req, res) => {
  const result = await UniteServices.getSingleUnitFromDB(req.params.id);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Unit fetched successfully',
    data: result,
  });
});

export const UnitControllers = {
  createUnit,
  updateUnit,
  getAllUnits,
  getSingleUnit,
};
