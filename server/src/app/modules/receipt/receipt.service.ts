import { Request } from 'express';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { Tenant } from '../tenent/tenant.model';
import { sendEmail } from '../../utils/sendEmail';
import fs from 'fs';

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

  const receipt = await sendEmail(tenantInfo.email, [
    {
      filename: `receipt.pdf`,
      path: req.file.path,
      contentType: 'application/pdf',
    },
  ]);

  console.log('Receipt sent');
  console.log(receipt);
  console.log(tenantInfo.email);

  fs.unlinkSync(req.file.path);
};

export const ReceiptServices = {
  sendReceiptToTenant,
};
