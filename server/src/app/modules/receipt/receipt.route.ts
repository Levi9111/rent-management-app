import { Router } from 'express';
import { ReceiptController } from './receipt.controller';
import { fileUploader } from '../../utils/fileUploader';

const router = Router();

router.post(
  '/send-receipt-to-tenant',
  fileUploader.upload.single('file'),
  ReceiptController.sendReceiptToTenant,
);

export const ReceiptRoutes = router;
