import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart.js';
import { placeOrder } from '../services/orderService.js';
import toast from 'react-hot-toast';

const SHIPPING_THRESHOLD = 150;
const SHIPPING_COST = 15;

const inputClass =
  'w-full bg-[#141414] border border-[#C9A96E]/20 text-[#F5F5F5] placeholder-[#8A8A8A] px-4 py-3 text-sm outline-none focus:border-[#C9A96E]/60 transition-colors';
const errorClass = 'text-red-400 text-xs mt-1';

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs tracking-[0.15em] uppercase text-[#8A8A8A] mb-2">{label}</label>
      {children}
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, sessionId, clearCart } = useCart();
  const shipping = subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: '', email: '', address: '', city: '', country: '', zip: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.country.trim()) e.country = 'Country is required';
    if (!form.zip.trim()) e.zip = 'ZIP / Postal code is required';
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty', {
        style: { background: '#1C1C1C', color: '#F5F5F5', border: '1px solid #C9A96E' },
      });
      return;
    }

    setSubmitting(true);
    try {
      const orderItems = items.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      }));

      const order = await placeOrder({
        customerInfo: form,
        items: orderItems,
        subtotal,
        shipping,
        total,
        sessionId,
      });

      clearCart();
      navigate(`/order-confirmation/${order.orderNumber}`);
    } catch {
      toast.error('Failed to place order. Please try again.', {
        style: { background: '#1C1C1C', color: '#F5F5F5', border: '1px solid #C9A96E' },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[#0A0A0A] pt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1 text-[#8A8A8A] hover:text-[#C9A96E] text-xs tracking-widest uppercase mb-8 transition-colors"
        >
          <ChevronLeft size={14} /> Back to Cart
        </Link>

        <h1
          className="text-3xl md:text-4xl text-[#F5F5F5] mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            {/* Customer Info */}
            <div>
              <h2 className="text-[#F5F5F5] text-sm tracking-[0.2em] uppercase mb-4 pb-2 border-b border-[#C9A96E]/20">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="Jean-Paul Laurent"
                    className={inputClass}
                  />
                </Field>
                <Field label="Email Address" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-[#F5F5F5] text-sm tracking-[0.2em] uppercase mb-4 pb-2 border-b border-[#C9A96E]/20">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <Field label="Street Address" error={errors.address}>
                  <input
                    type="text"
                    value={form.address}
                    onChange={handleChange('address')}
                    placeholder="12 Rue de la Paix"
                    className={inputClass}
                  />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="City" error={errors.city}>
                    <input
                      type="text"
                      value={form.city}
                      onChange={handleChange('city')}
                      placeholder="Paris"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Country" error={errors.country}>
                    <input
                      type="text"
                      value={form.country}
                      onChange={handleChange('country')}
                      placeholder="France"
                      className={inputClass}
                    />
                  </Field>
                </div>
                <Field label="ZIP / Postal Code" error={errors.zip}>
                  <input
                    type="text"
                    value={form.zip}
                    onChange={handleChange('zip')}
                    placeholder="75001"
                    className={`${inputClass} max-w-xs`}
                  />
                </Field>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 ${
                submitting
                  ? 'bg-[#C9A96E]/50 text-[#0A0A0A]/50 cursor-not-allowed'
                  : 'bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A]'
              }`}
            >
              {submitting ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
            </motion.button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-[#141414] border border-[#C9A96E]/20 rounded-xl p-6 sticky top-28"
            >
              <h2
                className="text-lg text-[#F5F5F5] mb-5"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Summary
              </h2>

              <div className="space-y-3 mb-5 max-h-64 overflow-y-auto scrollbar-hide">
                {items.map((item) => (
                  <div
                    key={`${item.productId._id}-${item.size}`}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.productId.images?.[0]}
                      alt={item.productId.name}
                      className="w-12 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F5] text-xs truncate">{item.productId.name}</p>
                      <p className="text-[#8A8A8A] text-xs">{item.size}ml × {item.quantity}</p>
                    </div>
                    <span className="text-[#C9A96E] text-sm flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C9A96E]/10 pt-4 space-y-2">
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
                <div className="flex justify-between pt-2 border-t border-[#C9A96E]/10">
                  <span className="text-[#F5F5F5] font-medium">Total</span>
                  <span className="text-[#C9A96E] font-semibold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
