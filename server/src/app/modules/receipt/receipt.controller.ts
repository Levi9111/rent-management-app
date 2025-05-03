import { catchAsync } from '../../utils/catrchAsync';
import { ReceiptServices } from './receipt.service';

const createReceipt = catchAsync(async (req, res) => {
  const result = await ReceiptServices.createReceiptIntoDB(req.body.receipt);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Receipt created successfully',
    data: result,
  });
});

const getAllReceipts = catchAsync(async (req, res) => {
  const result = await ReceiptServices.getAllReceiptsFromDB(req.query);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'All receipts fetched successfully',
    data: result,
  });
});

const getSingleReceipt = catchAsync(async (req, res) => {
  const result = await ReceiptServices.getSingleReceiptsFromDB(req.params.id);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Receipt fetched successfully',
    data: result,
  });
});

const getSingleReceiptByTenantId = catchAsync(async (req, res) => {
  const result = await ReceiptServices.getSingleReceiptByTenantIdFromDB(
    req.params.id,
  );
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Receipt fetched successfully',
    data: result,
  });
});

const sendReceiptToTenant = catchAsync(async (req, res) => {
  await ReceiptServices.sendReceiptToTenant(req);

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'Receipt send to tenant successfully',
  });
});

export const ReceiptController = {
  sendReceiptToTenant,
  createReceipt,
  getAllReceipts,
  getSingleReceipt,
  getSingleReceiptByTenantId,
};
