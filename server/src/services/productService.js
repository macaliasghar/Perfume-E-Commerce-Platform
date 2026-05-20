import Product from '../models/Product.js';

export async function getAllProducts(query) {
  const filter = {};
  const { category, featured, bestseller, search, sort } = query;

  if (category) filter.category = category;
  if (featured === 'true') filter.isFeatured = true;
  if (bestseller === 'true') filter.isBestseller = true;
  if (search) filter.name = { $regex: search, $options: 'i' };

  let sortOption = {};
  if (sort === 'price_asc') sortOption = { price: 1 };
  else if (sort === 'price_desc') sortOption = { price: -1 };
  else if (sort === 'rating') sortOption = { rating: -1 };
  else sortOption = { createdAt: -1 };

  return Product.find(filter).sort(sortOption);
}

export async function getProductById(id) {
  return Product.findById(id);
}
