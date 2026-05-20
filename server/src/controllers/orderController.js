import * as orderService from '../services/orderService.js';

export async function placeOrder(req, res, next) {
  try {
    const { customerInfo, items, subtotal, shipping, total, sessionId } = req.body;
    if (!customerInfo || !items || !items.length) {
      return res.status(400).json({ success: false, error: 'customerInfo and items are required', statusCode: 400 });
    }
    const order = await orderService.createOrder({ customerInfo, items, subtotal, shipping, total, sessionId });
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrderByNumber(req.params.orderNumber);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found', statusCode: 404 });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}
