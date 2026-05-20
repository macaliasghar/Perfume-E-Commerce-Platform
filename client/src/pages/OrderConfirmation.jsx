import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { fetchOrder } from '../services/orderService.js';

export default function OrderConfirmation() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(orderNumber)
      .then(setOrder)
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A0A0A] pt-24 flex flex-col items-center justify-center px-4"
    >
      <div className="max-w-2xl w-full text-center">
        {/* Success animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-24 h-24 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/30 flex items-center justify-center">
            <CheckCircle size={48} className="text-[#C9A96E]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="text-3xl md:text-4xl text-[#F5F5F5] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Order Confirmed
          </h1>
          <p className="text-[#8A8A8A] text-sm mb-2">
            Thank you for your order. We will send you a confirmation shortly.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#141414] border border-[#C9A96E]/30 px-4 py-2 rounded-full mt-2 mb-8">
            <Package size={14} className="text-[#C9A96E]" />
            <span className="text-[#C9A96E] text-sm font-mono tracking-wider">{orderNumber}</span>
          </div>
        </motion.div>

        {/* Order details */}
        {!loading && order && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[#141414] border border-[#C9A96E]/20 rounded-xl p-6 mb-8 text-left"
          >
            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-[#C9A96E]/10">
              <div>
                <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-1">Ship to</p>
                <p className="text-[#F5F5F5] text-sm">{order.customerInfo?.name}</p>
                <p className="text-[#8A8A8A] text-xs">{order.customerInfo?.address}</p>
                <p className="text-[#8A8A8A] text-xs">{order.customerInfo?.city}, {order.customerInfo?.country}</p>
              </div>
              <div>
                <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-1">Status</p>
                <span className="inline-block bg-[#C9A96E]/10 text-[#C9A96E] text-xs tracking-wider uppercase px-3 py-1 rounded-full border border-[#C9A96E]/30">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="text-[#F5F5F5]">{item.name}</span>
                    <span className="text-[#8A8A8A] text-xs ml-2">{item.size}ml × {item.quantity}</span>
                  </div>
                  <span className="text-[#C9A96E]">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#C9A96E]/10 pt-4 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-[#8A8A8A]">Subtotal</span>
                <span className="text-[#F5F5F5]">${order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8A8A8A]">Shipping</span>
                <span className="text-[#F5F5F5]">{order.shipping === 0 ? 'Free' : `$${order.shipping?.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-medium mt-2 pt-2 border-t border-[#C9A96E]/10">
                <span className="text-[#F5F5F5]">Total</span>
                <span className="text-[#C9A96E] font-semibold">${order.total?.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
