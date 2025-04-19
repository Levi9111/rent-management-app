import { catchAsync } from '../../utils/catrchAsync';
import { ReceiptServices } from './receipt.service';

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
};
