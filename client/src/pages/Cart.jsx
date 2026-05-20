import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';

const SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 15;

export default function Cart() {
  const { items, itemCount, subtotal, removeFromCart, updateQuantity } = useCart();
  const shipping = subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (itemCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#0A0A0A] pt-24 flex flex-col items-center justify-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center"
        >
          <ShoppingBag size={64} className="text-[#C9A96E]/30 mx-auto mb-6" />
          <h2
            className="text-2xl text-[#F5F5F5] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your cart is empty
          </h2>
          <p className="text-[#8A8A8A] text-sm mb-8">
            Discover our collection and find your signature scent.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            Explore Fragrances
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#0A0A0A] pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1
          className="text-3xl md:text-4xl text-[#F5F5F5] mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Cart ({itemCount})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Line items */}
          <div className="lg:col-span-2 space-y-0">
            <AnimatePresence>
              {items.map((item, index) => {
                const product = item.productId;
                return (
                  <motion.div
                    key={`${product._id}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex gap-4 md:gap-6 py-6 border-b border-[#C9A96E]/10"
                  >
                    {/* Image */}
                    <Link to={`/product/${product._id}`} className="flex-shrink-0">
                      <img
                        src={product.images?.[0] || 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=200&q=80'}
                        alt={product.name}
                        className="w-20 h-24 md:w-24 md:h-28 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <Link to={`/product/${product._id}`}>
                            <h3
                              className="text-[#F5F5F5] text-base leading-tight hover:text-[#C9A96E] transition-colors"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-[#8A8A8A] text-xs mt-1">{item.size}ml</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(product._id, item.size)}
                          className="text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors ml-4 flex-shrink-0"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity stepper */}
                        <div className="flex items-center border border-[#C9A96E]/30">
                          <button
                            onClick={() => updateQuantity(product._id, item.size, item.quantity - 1)}
                            className="w-8 h-8 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-[#F5F5F5] text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(product._id, item.size, item.quantity + 1)}
                            className="w-8 h-8 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-[#C9A96E] font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#141414] border border-[#C9A96E]/20 rounded-xl p-6 sticky top-28"
            >
              <h2
                className="text-xl text-[#F5F5F5] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A8A8A]">Subtotal</span>
                  <span className="text-[#F5F5F5]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8A8A8A]">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-[#C9A96E] text-xs">Free</span>
                  ) : (
                    <span className="text-[#F5F5F5]">${shipping.toFixed(2)}</span>
                  )}
                </div>
                {shipping > 0 && (
                  <p className="text-[#8A8A8A] text-xs">
                    Free shipping on orders over ${SHIPPING_THRESHOLD}
                  </p>
                )}
              </div>

              <div className="border-t border-[#C9A96E]/20 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#F5F5F5] font-medium">Total</span>
                  <span className="text-[#C9A96E] text-xl font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] py-3 text-sm font-semibold tracking-widest uppercase text-center transition-colors duration-200"
              >
                Proceed to Checkout
              </Link>

              <Link
                to="/shop"
                className="block text-center text-[#8A8A8A] hover:text-[#C9A96E] text-xs tracking-widest uppercase mt-4 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
