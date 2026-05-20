import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, Instagram, Twitter, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'Collections', to: '/shop?collection=featured' },
    { label: 'About', to: '/about' },
  ];

  const isActive = (link) => {
    if (link.to.includes('?')) {
      return location.pathname + location.search === link.to;
    }
    return location.pathname === link.to;
  };

  return (
    <>
      {/* Gold accent top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent" />

      <header
        className={`fixed top-[1px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20 md:h-24">

            {/* Desktop Nav — left */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <div key={link.to} className="group relative">
                  <Link
                    to={link.to}
                    className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                      isActive(link)
                        ? 'text-[#C9A96E]'
                        : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {link.label}
                  </Link>
                  <span
                    className={`block h-[1px] bg-[#C9A96E] transition-transform duration-300 origin-left ${
                      isActive(link) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </div>
              ))}
            </nav>

            {/* Logo — absolutely centered */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
              <span
                className="text-3xl md:text-4xl font-bold tracking-widest text-[#C9A96E]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '0 0 30px rgba(201,169,110,0.4)',
                }}
              >
                Lumière
              </span>
              <span className="text-xs text-[#C9A96E] mt-0.5 leading-none">◆</span>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen((o) => !o)}
                className="group p-2 text-[#8A8A8A] hover:text-[#C9A96E] transition-colors duration-200"
                aria-label="Toggle search"
              >
                <Search size={20} />
              </button>

              {/* Cart icon */}
              <Link to="/cart" className="relative group p-2">
                <ShoppingBag
                  size={20}
                  className="text-[#8A8A8A] group-hover:text-[#C9A96E] transition-colors duration-200"
                />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-[#C9A96E] to-[#A07840] text-[#0A0A0A] text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {itemCount > 9 ? '9+' : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden p-2 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar slide-down */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden bg-[#111111] border-t border-[#C9A96E]/10"
            >
              <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fragrances..."
                  className="flex-1 bg-transparent text-[#F5F5F5] placeholder-[#555555] text-sm tracking-wider border-b border-[#C9A96E] outline-none pb-2 focus:border-[#C9A96E]/80 transition-colors duration-200"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors duration-200 p-1"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 bg-[#141414] z-50 md:hidden flex flex-col pt-20 px-8 border-l border-[#C9A96E]/20"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-5 right-5 text-[#8A8A8A] hover:text-[#F5F5F5]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>

              {/* Drawer brand name */}
              <div className="mb-8 flex flex-col items-center">
                <span
                  className="text-2xl font-bold tracking-widest text-[#C9A96E]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    textShadow: '0 0 20px rgba(201,169,110,0.35)',
                  }}
                >
                  Lumière
                </span>
                <span className="text-xs text-[#C9A96E] mt-0.5">◆</span>
              </div>

              {/* Drawer nav links */}
              <div className="flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={link.to}
                      className={`block text-sm tracking-widest uppercase py-4 border-b border-[#C9A96E]/10 transition-colors duration-200 ${
                        isActive(link)
                          ? 'text-[#C9A96E]'
                          : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social icons */}
              <div className="pb-10 pt-6 flex items-center justify-center gap-6 border-t border-[#C9A96E]/10 mt-auto">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-[#555555] hover:text-[#C9A96E] transition-colors duration-200"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-[#555555] hover:text-[#C9A96E] transition-colors duration-200"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-[#555555] hover:text-[#C9A96E] transition-colors duration-200"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
