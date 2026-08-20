import { Response } from 'express';
import { Order } from '../models/Order';
import { AuthRequest } from '../middleware/authMiddleware';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, discount, shippingFee, total } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ message: 'No order items provided' });
      return;
    }

    const orderNumber = `TRD-${Math.floor(10000 + Math.random() * 90000)}`;

    const order = new Order({
      orderNumber,
      userId: req.user ? req.user.id : req.body.userId || '650000000000000000000000',
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'Credit Card',
      subtotal,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      total
    });

    const created = await order.save();
    res.status(201).json(created);
  } catch (error: any) {
    res.status(400).json({ message: 'Order creation failed', error: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user ? req.user.id : req.query.userId;
    const orders = await Order.find({ userId }).sort({ placedAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};
