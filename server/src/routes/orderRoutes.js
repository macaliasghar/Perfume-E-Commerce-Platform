import { Router } from 'express';
import { placeOrder, getOrder } from '../controllers/orderController.js';

const router = Router();

router.post('/', placeOrder);
router.get('/:orderNumber', getOrder);

export default router;
