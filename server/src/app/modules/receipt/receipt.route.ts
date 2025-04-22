import { Router } from 'express';
import { ReceiptController } from './receipt.controller';
import { fileUploader } from '../../utils/fileUploader';
import validateRequest from '../../middlewares/validateRequest';
import { ReceiptValidation } from './receipt.validation';

const router = Router();

router.post(
  '/send-receipt-to-tenant',
  fileUploader.upload.single('file'),
  ReceiptController.sendReceiptToTenant,
);

router.post(
  '/create-receipt',
  validateRequest(ReceiptValidation.createReceiptValidationSchema),
  ReceiptController.createReceipt,
);

router.get('/', ReceiptController.getAllReceipts);

router.get('/:id', ReceiptController.getSingleReceipt);

export const ReceiptRoutes = router;
