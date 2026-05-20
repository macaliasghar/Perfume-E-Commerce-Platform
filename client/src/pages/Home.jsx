import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { fetchProducts } from '../services/productService.js';
import ProductCard from '../components/ProductCard.jsx';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [bestsellers, setBestsellers] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    fetchProducts({ featured: 'true' }).then(setFeatured).catch(() => {});
    fetchProducts({ bestseller: 'true' }).then(setBestsellers).catch(() => {});
  }, []);

  const categories = [
    { label: 'Men', image: 'https://images.unsplash.com/photo-1590736969596-bde1c3aad1e0?w=600&q=80', desc: 'Bold, sophisticated masculinity' },
    { label: 'Women', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80', desc: 'Timeless feminine elegance' },
    { label: 'Unisex', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80', desc: 'Beyond boundaries' },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/70 via-[#0A0A0A]/50 to-[#0A0A0A]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            variants={fadeInUp}
            className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-6"
          >
            Lumière Parfums — Est. 1952
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #C9A96E 0%, #E2C895 50%, #C9A96E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            The Art of Scent
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-[#8A8A8A] text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          >
            A curated collection of extraordinary fragrances for those who demand nothing but the finest.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border border-[#C9A96E]/50 hover:border-[#C9A96E] text-[#C9A96E] px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              Our Story
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ── Featured Collection ───────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Handpicked</p>
          <h2
            className="text-3xl md:text-4xl text-[#F5F5F5]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Curated Fragrances
          </h2>
        </motion.div>

        {featured.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featured.map((p) => (
              <motion.div key={p._id} variants={fadeInUp}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#1C1C1C] rounded-xl animate-pulse" style={{ aspectRatio: '4/5' }} />
            ))}
          </div>
        )}

        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[#C9A96E] hover:text-[#E2C895] text-sm tracking-widest uppercase transition-colors duration-200"
          >
            View All Fragrances
            <ChevronRight size={16} />
          </Link>
        </motion.div>
      </section>

      {/* ── Brand Story Strip ─────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#0A0A0A]">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-16 h-px bg-[#C9A96E]/40 mx-auto mb-8" />
          <p
            className="text-2xl md:text-3xl text-[#C9A96E] italic leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "A perfume is a work of art. It is invisible yet speaks louder than words. It is ephemeral yet lingers in memory forever."
          </p>
          <div className="w-16 h-px bg-[#C9A96E]/40 mx-auto mt-8 mb-4" />
          <p className="text-[#8A8A8A] text-xs tracking-[0.3em] uppercase">— The House of Lumière</p>
        </motion.div>
      </section>

      {/* ── Bestsellers ──────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Most Loved</p>
          <h2
            className="text-3xl md:text-4xl text-[#F5F5F5]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bestsellers
          </h2>
        </motion.div>

        {bestsellers.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {bestsellers.map((p) => (
              <motion.div key={p._id} variants={fadeInUp}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-[#1C1C1C] rounded-xl animate-pulse" style={{ aspectRatio: '4/5' }} />
            ))}
          </div>
        )}
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">Explore</p>
            <h2
              className="text-3xl md:text-4xl text-[#F5F5F5]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop by Category
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={fadeInUp}>
                <Link
                  to={`/shop?category=${cat.label}`}
                  className="group relative overflow-hidden rounded-xl block"
                  style={{ aspectRatio: '3/4' }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent" />
                  <div
                    className="absolute inset-0 border border-transparent group-hover:border-[#C9A96E]/60 transition-all duration-300 rounded-xl"
                    style={{ boxShadow: 'inset 0 0 0 0px rgba(201,169,110,0)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3
                      className="text-[#F5F5F5] text-2xl mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {cat.label}
                    </h3>
                    <p className="text-[#8A8A8A] text-sm">{cat.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-[#C9A96E] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────── */}
      <section className="py-24 px-4 bg-[#141414] border-t border-[#C9A96E]/10">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4">Stay Connected</p>
          <h2
            className="text-3xl md:text-4xl text-[#F5F5F5] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Enter Our World
          </h2>
          <p className="text-[#8A8A8A] mb-8 leading-relaxed">
            Be the first to discover new launches, private sales, and exclusive fragrance stories.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNewsletterEmail('');
            }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 max-w-xs bg-[#1C1C1C] border border-[#C9A96E]/30 text-[#F5F5F5] placeholder-[#8A8A8A] px-5 py-3 text-sm outline-none focus:border-[#C9A96E] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] px-8 py-3 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </motion.div>
  );
}
