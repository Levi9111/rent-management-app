import { catchAsync } from '../../utils/catrchAsync';
import { TenantServices } from './tenant.service';

const createTenant = catchAsync(async (req, res) => {
  const result = await TenantServices.createTenantIntoDB(req.body.tenant);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Tenant created successfully',
    data: result,
  });
});

const updateTenant = catchAsync(async (req, res) => {
  const result = await TenantServices.updateTenantIntoDB(
    req.params.id,
    req.body.tenant,
  );

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Tenant updated successfully',
    data: result,
  });
});

const getAllTenants = catchAsync(async (req, res) => {
  const result = await TenantServices.getAllTenantFromDB();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'All Tenants fetched successfully',
    data: result,
  });
});

const getCurrentTenants = catchAsync(async (req, res) => {
  const result = await TenantServices.getCurrentTenantFromDB();

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'All Current Tenants fetched successfully',
    data: result,
  });
});

const getSingleTenant = catchAsync(async (req, res) => {
  const result = await TenantServices.getSingleTenantFromDB(req.params.id);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Tenant fetched successfully',
    data: result,
  });
});

export const TenantControllers = {
  createTenant,
  updateTenant,
  getAllTenants,
  getCurrentTenants,
  getSingleTenant,
};
