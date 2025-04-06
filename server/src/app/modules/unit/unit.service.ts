import { TUnit } from './unit.interface';
import Unit from './unit.model';

const createUnitIntoDB = async (payload: TUnit) => {
  const result = await Unit.create(payload);

  return result;
};

const updateUnitIntoDB = async (id: string, payload: Partial<TUnit>) => {
  const result = await Unit.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error('Unit not found');
  }
  return result;
};

const getAllUnitsFromDB = async () => {
  const result = await Unit.find({}).populate('currentTenant');
  return result;
};

const getSingleUnitFromDB = async (id: string) => {
  const result = await Unit.findOne({ _id: id }).populate('currentTenant');

  return result;
};

export const UniteServices = {
  createUnitIntoDB,
  updateUnitIntoDB,
  getAllUnitsFromDB,
  getSingleUnitFromDB,
};
