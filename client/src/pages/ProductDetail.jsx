import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, ChevronLeft, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { fetchProductById, fetchProducts } from '../services/productService.js';
import { useCart } from '../hooks/useCart.js';
import ProductCard from '../components/ProductCard.jsx';

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={16}
            className={i <= Math.round(rating) ? 'text-[#C9A96E] fill-[#C9A96E]' : 'text-[#8A8A8A]'}
          />
        ))}
      </div>
      <span className="text-[#C9A96E] text-sm font-medium">{rating.toFixed(1)}</span>
      <span className="text-[#8A8A8A] text-sm">({count} reviews)</span>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notesOpen, setNotesOpen] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const p = await fetchProductById(id);
        setProduct(p);
        setSelectedSize(p.sizes?.[1] || p.sizes?.[0] || null);
        const others = await fetchProducts({ category: p.category });
        setRelated(others.filter((o) => o._id !== p._id).slice(0, 4));
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    load();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const size = selectedSize?.ml || 100;
    const price = selectedSize?.price || product.price;
    addToCart(product, size, price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24 flex items-center justify-center">
        <div className="text-[#C9A96E] text-sm tracking-widest">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-24 flex flex-col items-center justify-center">
        <p className="text-[#8A8A8A] mb-4">Product not found.</p>
        <Link to="/shop" className="text-[#C9A96E] hover:text-[#E2C895] text-sm tracking-widest uppercase">
          Back to Shop
        </Link>
      </div>
    );
  }

  const noteCategories = [
    { label: 'Top Notes', key: 'top', icon: '✦' },
    { label: 'Heart Notes', key: 'heart', icon: '♡' },
    { label: 'Base Notes', key: 'base', icon: '◆' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#0A0A0A] pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-xs text-[#8A8A8A]">
          <Link to="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#C9A96E] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[#F5F5F5]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div>
            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-xl overflow-hidden bg-[#141414] mb-4"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={product.images?.[selectedImage] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isBestseller && (
                <div className="absolute top-4 left-4 bg-[#C9A96E] text-[#0A0A0A] text-xs font-bold tracking-widest uppercase px-3 py-1">
                  Bestseller
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? 'border-[#C9A96E]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="text-[#C9A96E] text-xs tracking-[0.3em] uppercase mb-2">{product.brand}</p>
            <h1
              className="text-3xl md:text-4xl text-[#F5F5F5] mb-3 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {product.name}
            </h1>
            <div className="mb-4">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl text-[#C9A96E] font-semibold">
                ${selectedSize ? selectedSize.price : product.price}
              </span>
              {product.originalPrice && (
                <span className="text-[#8A8A8A] line-through text-lg">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-[#8A8A8A] text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <p className="text-[#F5F5F5] text-xs tracking-[0.2em] uppercase mb-3">
                  Size — {selectedSize?.ml}ml
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm border transition-all duration-200 ${
                        selectedSize?.ml === size.ml
                          ? 'border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10'
                          : 'border-[#C9A96E]/30 text-[#8A8A8A] hover:border-[#C9A96E]/60 hover:text-[#F5F5F5]'
                      }`}
                    >
                      {size.ml}ml — ${size.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-[#C9A96E]/30">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors flex items-center justify-center"
                >
                  −
                </button>
                <span className="w-10 text-center text-[#F5F5F5] text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] py-3 text-sm font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </motion.button>
            </div>

            {/* Fragrance Notes */}
            <div className="border border-[#C9A96E]/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setNotesOpen((o) => !o)}
                className="w-full flex items-center justify-between p-4 text-sm text-[#F5F5F5] tracking-wider"
              >
                <span className="flex items-center gap-2">
                  <Package size={14} className="text-[#C9A96E]" />
                  Fragrance Notes
                </span>
                {notesOpen ? <ChevronUp size={16} className="text-[#8A8A8A]" /> : <ChevronDown size={16} className="text-[#8A8A8A]" />}
              </button>

              <AnimatePresence>
                {notesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-3 gap-0 border-t border-[#C9A96E]/10">
                      {noteCategories.map((nc, i) => (
                        <div
                          key={nc.key}
                          className={`p-4 ${i < 2 ? 'border-r border-[#C9A96E]/10' : ''}`}
                        >
                          <div className="text-[#C9A96E] text-center text-lg mb-1">{nc.icon}</div>
                          <p className="text-[#8A8A8A] text-xs tracking-widest uppercase text-center mb-3">{nc.label}</p>
                          <ul className="space-y-1">
                            {(product.notes?.[nc.key] || []).map((note) => (
                              <li key={note} className="text-[#F5F5F5] text-xs text-center">{note}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2
              className="text-2xl text-[#F5F5F5] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
