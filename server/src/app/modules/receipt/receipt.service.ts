import { Request } from 'express';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';
import { Tenant } from '../tenent/tenant.model';
import { sendEmail } from '../../utils/sendEmail';
import fs from 'fs';

const sendReceiptToTenant = async (req: Request) => {
  console.log('Receipt service 1');
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No file found!!');
  }

  const tenantInfo = await Tenant.findOne({
    _id: req.body.tenantId,
  });

  console.log('Receipt service 2');

  if (!tenantInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Tenant not found');
  }

  if (tenantInfo.status === 'former') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This tenant is no longer renting a unit!',
    );
  }

  console.log('Receipt service 3');

  // sending email to the tenant

  console.log(req.file.path);
  console.log(req.file.buffer);

  await sendEmail(tenantInfo.email, [
    {
      filename: `receipt.pdf`,
      path: req.file.path,
      contentType: 'application/pdf',
    },
  ]);

  fs.unlinkSync(req.file.path);

  // await sendEmail(tenantInfo.email, [
  //   {
  //     filename: `receipt.pdf`,
  //     content: req.file.buffer, // Buffer from memoryStorage
  //     contentType: 'application/pdf',
  //   },
  // ]);
};

export const ReceiptServices = {
  sendReceiptToTenant,
};
