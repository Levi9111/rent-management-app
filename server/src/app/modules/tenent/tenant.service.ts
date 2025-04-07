import { TTenant } from './tenant.interface';
import { Tenant } from './tenant.model';

const createTenantIntoDB = async (payload: TTenant) => {
  console.log(payload);
  const result = await Tenant.create(payload);

  return result;
};

const updateTenantIntoDB = async (id: string, payload: Partial<TTenant>) => {
  const result = await Tenant.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error('Unit not found');
  }
  return result;
};

const getAllTenantFromDB = async () => {
  const result = await Tenant.find();
  return result;
};

const getSingleTenantFromDB = async (id: string) => {
  const result = await Tenant.findOne({ _id: id });

  return result;
};

export const TenantServices = {
  createTenantIntoDB,
  updateTenantIntoDB,
  getAllTenantFromDB,
  getSingleTenantFromDB,
};
