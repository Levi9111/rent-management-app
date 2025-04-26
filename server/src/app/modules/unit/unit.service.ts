import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../Errors/AppError';
import { parseNumberStrings } from '../../helpers/parseNumberStrings';
import { TUnit } from './unit.interface';
import Unit from './unit.model';

const createUnitIntoDB = async (payload: TUnit) => {
  const processedPayload = parseNumberStrings(payload);
  const existingUnit = await Unit.findOne({
    name: processedPayload.name,
  });
  if (existingUnit) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This Unit already exists');
  }

  const result = await Unit.create(processedPayload);

  return result;
};

const updateUnitIntoDB = async (id: string, payload: Partial<TUnit>) => {
  const processedPayload = parseNumberStrings(payload);

  const result = await Unit.findOneAndUpdate({ _id: id }, processedPayload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error('Unit not found');
  }
  return result;
};

const getAllUnitsFromDB = async (query: Record<string, unknown>) => {
  const unitQuery = new QueryBuilder(Unit.find(), query)
    .search([''])
    .filter()
    .sort()
    .fields()
    .paginate();

  const result = await unitQuery.modelQuery;

  return result;
};

const getSingleUnitFromDB = async (id: string) => {
  const result = await Unit.findOne({ _id: id });

  return result;
};

export const UniteServices = {
  createUnitIntoDB,
  updateUnitIntoDB,
  getAllUnitsFromDB,
  getSingleUnitFromDB,
};
