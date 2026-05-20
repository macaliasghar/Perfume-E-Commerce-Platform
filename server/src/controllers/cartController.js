import * as cartService from '../services/cartService.js';

export async function upsertCart(req, res, next) {
  try {
    const { sessionId, items } = req.body;
    if (!sessionId) {
      return res.status(400).json({ success: false, error: 'sessionId is required', statusCode: 400 });
    }
    const cart = await cartService.upsertCart(sessionId, items || []);
    res.json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}

export async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCartBySession(req.params.sessionId);
    if (!cart) {
      return res.json({ success: true, data: { sessionId: req.params.sessionId, items: [] } });
    }
    res.json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}

export async function removeItem(req, res, next) {
  try {
    const { productId, size } = req.body;
    const { sessionId } = req.params;
    if (!productId || !size) {
      return res.status(400).json({ success: false, error: 'productId and size are required', statusCode: 400 });
    }
    const cart = await cartService.removeCartItem(sessionId, productId, size);
    res.json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
}
