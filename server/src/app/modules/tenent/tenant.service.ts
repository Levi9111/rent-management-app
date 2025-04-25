import httpStatus from 'http-status';
import AppError from '../../Errors/AppError';
import Unit from '../unit/unit.model';
import { TTenant } from './tenant.interface';
import { Tenant } from './tenant.model';

const createTenantIntoDB = async (payload: TTenant) => {
  const unit = await Unit.findOne({ _id: payload.rentedUnit });

  if (!unit) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  if (unit.occupied) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Unit is already occupied');
  }

  payload.advancedAmount = Number(payload.advancedAmount);
  const result = await Tenant.create(payload);

  unit.occupied = true;
  await unit.save();

  return result;
};

const updateTenantIntoDB = async (id: string, payload: Partial<TTenant>) => {
  const result = await Tenant.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Tenant not found');
  }

  if (result.status === 'former') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Aggrement with this tenant has already ended',
    );
  }

  if (payload.status === 'former') {
    result.rentEndDate = new Date();

    // Mark the unit as not occupied
    const unit = await Unit.findOneAndUpdate(
      { _id: result.rentedUnit },
      {
        occupied: false,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!unit) {
      throw new AppError(httpStatus.NOT_FOUND, 'Unit not found');
    }

    await unit.save();

    // Save the updated tenant status and rentEndDate
    await result.save();
  }

  return result;
};

const getCurrentTenantFromDB = async () => {
  const result = await Tenant.find({ status: 'current' }).populate(
    'rentedUnit',
  );
  return result;
};

const getAllTenantFromDB = async () => {
  const result = await Tenant.find().populate('rentedUnit');
  return result;
};

const getSingleTenantFromDB = async (id: string) => {
  const result = await Tenant.findOne({ _id: id }).populate('rentedUnit');

  return result;
};

export const TenantServices = {
  createTenantIntoDB,
  updateTenantIntoDB,
  getAllTenantFromDB,
  getCurrentTenantFromDB,
  getSingleTenantFromDB,
};
