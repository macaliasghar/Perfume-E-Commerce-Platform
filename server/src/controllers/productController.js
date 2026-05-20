import * as productService from '../services/productService.js';

export async function listProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found', statusCode: 404 });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
}
