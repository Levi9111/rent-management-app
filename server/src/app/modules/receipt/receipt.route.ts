import { Router } from 'express';
import { upload } from '../../utils/fileUploader';
import { ReceiptController } from './receipt.controller';

const router = Router();

router.post(
  '/send-receipt-to-tenant',
  upload.single('file'),
  ReceiptController.sendReceiptToTenant,
);

export const ReceiptRoutes = router;
