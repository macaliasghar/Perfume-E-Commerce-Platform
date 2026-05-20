import api from './api.js';

export async function fetchProducts(params = {}) {
  const response = await api.get('/products', { params });
  return response.data.data;
}

export async function fetchProductById(id) {
  const response = await api.get(`/products/${id}`);
  return response.data.data;
}
