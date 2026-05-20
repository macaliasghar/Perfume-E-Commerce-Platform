import api from './api.js';

export async function fetchCart(sessionId) {
  const response = await api.get(`/cart/${sessionId}`);
  return response.data.data;
}

export async function saveCart(sessionId, items) {
  const response = await api.post('/cart', { sessionId, items });
  return response.data.data;
}

export async function deleteCartItem(sessionId, productId, size) {
  const response = await api.delete(`/cart/${sessionId}/item`, {
    data: { productId, size },
  });
  return response.data.data;
}
