import api from './api.js';

export async function placeOrder(orderData) {
  const response = await api.post('/orders', orderData);
  return response.data.data;
}

export async function fetchOrder(orderNumber) {
  const response = await api.get(`/orders/${orderNumber}`);
  return response.data.data;
}
