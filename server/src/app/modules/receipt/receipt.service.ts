import { Request } from 'express';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { Tenant } from '../tenent/tenant.model';
import { sendEmail } from '../../utils/sendEmail';
import fs from 'fs';
import { TReceipt } from './receipt.interface';
import { ReceiptUtils } from './receipt.utils';
import { Receipt } from './receipt.model';
import QueryBuilder from '../../builder/QueryBuilder';
import Unit from '../unit/unit.model';

const createReceiptIntoDB = async (payload: TReceipt) => {
  const today = new Date();

  const generatedReceiptDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(today);

  const rentMonth = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(today);

  const { tenantId, rentAmountPaid } = payload;

  const searchExistingReceipt = await Receipt.findOne({
    tenantId,
    rentMonth,
  });
  if (searchExistingReceipt) {
    return searchExistingReceipt.populate(['unitId', 'tenantId']);
  }

  const tenantInfo = await Tenant.findOne({
    _id: tenantId,
  });
  if (!tenantInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Tenant not found');
  }

  const unitInfo = await Unit.findOne({
    _id: tenantInfo.rentedUnit,
  });
  if (!unitInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Unit not found');
  }

  const { monthlyRent, gasBill, waterBill, others } = unitInfo;

  const totalAmount =
    Number(monthlyRent) + Number(gasBill) + Number(waterBill) + Number(others);

  const balanceDue = totalAmount - Number(rentAmountPaid);

  const receiptId = await ReceiptUtils.generateReceiptNumber();

  const result = await Receipt.create({
    ...payload,
    receiptId,
    generatedReceiptDate,
    rentMonth,
    unitId: tenantInfo.rentedUnit,
    balanceDue,
    totalAmount,
  });

  return result.populate(['unitId', 'tenantId']);
};

const getAllReceiptsFromDB = async (query: Record<string, unknown>) => {
  const receiptData = new QueryBuilder(
    Receipt.find()
      .populate({
        path: 'unitId',
      })
      .populate({
        path: 'tenantId',
      }),
    query,
  )
    .search(['receiptId'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await receiptData.modelQuery;

  return result;
};

const getSingleReceiptsFromDB = async (id: string) => {
  const receipt = await Receipt.findOne({ _id: id });

  if (!receipt) {
    throw new AppError(httpStatus.NOT_FOUND, 'No receipt found!!');
  }
  return receipt;
};

const sendReceiptToTenant = async (req: Request) => {
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No file found!!');
  }

  const tenantInfo = await Tenant.findOne({
    _id: req.body.tenantId,
  });

  if (!tenantInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Tenant not found');
  }

  if (tenantInfo.status === 'former') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This tenant is no longer renting a unit!',
    );
  }

  await sendEmail(tenantInfo.email, [
    {
      filename: `receipt.pdf`,
      path: req.file.path,
      contentType: 'application/pdf',
    },
  ]);

  fs.unlinkSync(req.file.path);
};

export const ReceiptServices = {
  sendReceiptToTenant,
  createReceiptIntoDB,
  getAllReceiptsFromDB,
  getSingleReceiptsFromDB,
};
