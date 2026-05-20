import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart.js';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= Math.round(rating) ? 'text-[#C9A96E] fill-[#C9A96E]' : 'text-[#8A8A8A]'}
        />
      ))}
      <span className="text-xs text-[#8A8A8A] ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);

  const defaultSize = product.sizes?.[0];

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (defaultSize) {
      addToCart(product, defaultSize.ml, defaultSize.price);
    } else {
      addToCart(product, 100, product.price);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative bg-[#1C1C1C] rounded-xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hovered ? '0 8px 40px rgba(201, 169, 110, 0.15), 0 0 0 1px rgba(201, 169, 110, 0.3)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <Link to={`/product/${product._id}`}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
          <motion.img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&q=80'}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestseller && (
              <span className="bg-[#C9A96E] text-[#0A0A0A] text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                Bestseller
              </span>
            )}
            {product.isFeatured && !product.isBestseller && (
              <span className="bg-[#0A0A0A]/80 border border-[#C9A96E] text-[#C9A96E] text-[10px] font-bold tracking-widest uppercase px-2 py-1">
                Featured
              </span>
            )}
          </div>

          {/* Quick add button slides up on hover */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: hovered ? 0 : '100%', opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 p-3"
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] py-2.5 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-1">{product.brand}</p>
          <h3
            className="text-[#F5F5F5] text-base mb-2 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {product.name}
          </h3>
          <StarRating rating={product.rating} />
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#C9A96E] font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-[#8A8A8A] text-sm line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
