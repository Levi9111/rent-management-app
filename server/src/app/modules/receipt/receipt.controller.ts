import path from 'path';
import { catchAsync } from '../../utils/catrchAsync';
import { ReceiptServices } from './receipt.service';
import fs from 'fs';

const sendReceiptToTenant = catchAsync(async (req, res) => {
  // TODO: remove later
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: 'Upload folder doenst exist',
    });
  } else {
    await ReceiptServices.sendReceiptToTenant(req);

    res.status(200).json({
      statusCode: 200,
      success: true,
      message: 'Receipt send to tenant successfully',
    });
  }
});

export const ReceiptController = {
  sendReceiptToTenant,
};
