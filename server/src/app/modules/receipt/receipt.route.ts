import { Router } from 'express';
import { upload } from '../../utils/fileUploader';

const router = Router();

router.post('/', upload.single('file'));

export const ReceiptRoutes = router;
