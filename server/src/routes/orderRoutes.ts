import { Router } from 'express';
import { createOrder, getMyOrders } from '../controllers/orderController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', createOrder);
router.get('/', protect, getMyOrders);

export default router;
