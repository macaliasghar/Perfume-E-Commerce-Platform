import Order from '../models/Order.js';
import { clearCart } from './cartService.js';

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LUM-${timestamp}-${random}`;
}

export async function createOrder(data) {
  const { customerInfo, items, subtotal, shipping, total, sessionId } = data;
  const orderNumber = generateOrderNumber();

  const order = await Order.create({
    orderNumber,
    customerInfo,
    items,
    subtotal,
    shipping,
    total,
    status: 'confirmed',
  });

  if (sessionId) {
    await clearCart(sessionId);
  }

  return order;
}

export async function getOrderByNumber(orderNumber) {
  return Order.findOne({ orderNumber });
}
