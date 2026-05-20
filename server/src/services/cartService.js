import Cart from '../models/Cart.js';

export async function upsertCart(sessionId, items) {
  return Cart.findOneAndUpdate(
    { sessionId },
    { sessionId, items },
    { upsert: true, new: true }
  );
}

export async function getCartBySession(sessionId) {
  return Cart.findOne({ sessionId }).populate('items.productId');
}

export async function removeCartItem(sessionId, productId, size) {
  const cart = await Cart.findOne({ sessionId });
  if (!cart) return null;
  cart.items = cart.items.filter(
    (item) => !(item.productId.toString() === productId && item.size === Number(size))
  );
  return cart.save();
}

export async function clearCart(sessionId) {
  return Cart.findOneAndUpdate(
    { sessionId },
    { items: [] },
    { new: true }
  );
}
