import { Router } from 'express';
import { upsertCart, getCart, removeItem } from '../controllers/cartController.js';

const router = Router();

router.post('/', upsertCart);
router.get('/:sessionId', getCart);
router.delete('/:sessionId/item', removeItem);

export default router;
