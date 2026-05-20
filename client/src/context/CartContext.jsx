import { createContext, useState, useEffect, useCallback } from 'react';
import { saveCart, fetchCart } from '../services/cartService.js';
import toast from 'react-hot-toast';

export const CartContext = createContext(null);

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getOrCreateSessionId() {
  let id = localStorage.getItem('lumiere_session_id');
  if (!id) {
    id = generateSessionId();
    localStorage.setItem('lumiere_session_id', id);
  }
  return id;
}

export function CartProvider({ children }) {
  const [sessionId] = useState(getOrCreateSessionId);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCart() {
      try {
        const cart = await fetchCart(sessionId);
        if (cart && cart.items) {
          setItems(cart.items);
        }
      } catch {
        // Cart fetch failed — start empty
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, [sessionId]);

  const syncCart = useCallback(async (newItems) => {
    try {
      await saveCart(sessionId, newItems);
    } catch {
      // Silently fail sync — local state is source of truth
    }
  }, [sessionId]);

  const addToCart = useCallback((product, size, price) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId._id === product._id && item.size === size
      );
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.productId._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated = [
          ...prev,
          { productId: { _id: product._id, name: product.name, images: product.images }, size, quantity: 1, price },
        ];
      }
      syncCart(
        updated.map((i) => ({
          productId: i.productId._id,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
        }))
      );
      return updated;
    });
    toast.success(`${product.name} added to cart`, {
      style: { background: '#1C1C1C', color: '#F5F5F5', border: '1px solid #C9A96E' },
    });
  }, [syncCart]);

  const removeFromCart = useCallback((productId, size) => {
    setItems((prev) => {
      const updated = prev.filter(
        (item) => !(item.productId._id === productId && item.size === size)
      );
      syncCart(
        updated.map((i) => ({
          productId: i.productId._id,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
        }))
      );
      return updated;
    });
  }, [syncCart]);

  const updateQuantity = useCallback((productId, size, quantity) => {
    if (quantity < 1) return;
    setItems((prev) => {
      const updated = prev.map((item) =>
        item.productId._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      );
      syncCart(
        updated.map((i) => ({
          productId: i.productId._id,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
        }))
      );
      return updated;
    });
  }, [syncCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    syncCart([]);
  }, [syncCart]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      sessionId,
      loading,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}
