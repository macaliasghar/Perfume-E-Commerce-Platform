import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { fetchProducts } from '../services/productService.js';
import ProductCard from '../components/ProductCard.jsx';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (sort) params.sort = sort;
      const data = await fetchProducts(params);
      let filtered = data;
      if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
      if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      setProducts(filtered);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort, minPrice, maxPrice]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const updateCategory = (val) => {
    setCategory(val);
    const params = new URLSearchParams(searchParams);
    if (val) params.set('category', val);
    else params.delete('category');
    setSearchParams(params);
  };

  const clearFilters = () => {
    setCategory('');
    setSort('');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setSearchParams({});
  };

  const hasFilters = category || sort || minPrice || maxPrice || search;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A0A0A] pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-10">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-2">The Collection</p>
          <h1
            className="text-3xl md:text-4xl text-[#F5F5F5]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            All Fragrances
          </h1>
        </motion.div>

        {/* Search + Filter bar */}
        <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fragrances..."
              className="w-full bg-[#141414] border border-[#C9A96E]/20 text-[#F5F5F5] placeholder-[#8A8A8A] pl-10 pr-4 py-3 text-sm outline-none focus:border-[#C9A96E]/60 transition-colors"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-[#141414] border border-[#C9A96E]/20 text-[#8A8A8A] px-4 pr-10 py-3 text-sm outline-none focus:border-[#C9A96E]/60 transition-colors cursor-pointer"
            >
              <option value="">Sort: Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A8A8A] pointer-events-none" />
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="md:hidden flex items-center gap-2 bg-[#141414] border border-[#C9A96E]/20 text-[#8A8A8A] px-4 py-3 text-sm"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-[#C9A96E] hover:text-[#E2C895] text-sm transition-colors"
            >
              <X size={14} /> Clear
            </button>
          )}
        </motion.div>

        <div className="flex gap-8">
          {/* Sidebar Filters (desktop) */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-28">
              <h3 className="text-[#F5F5F5] text-xs tracking-[0.2em] uppercase mb-5">Filters</h3>

              {/* Category */}
              <div className="mb-8">
                <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">Category</p>
                {['', 'Men', 'Women', 'Unisex'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateCategory(cat)}
                    className={`block w-full text-left py-2 text-sm border-b border-[#C9A96E]/10 transition-colors ${
                      category === cat
                        ? 'text-[#C9A96E]'
                        : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {cat || 'All'}
                  </button>
                ))}
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">Price Range</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                    className="w-full bg-[#141414] border border-[#C9A96E]/20 text-[#F5F5F5] placeholder-[#8A8A8A] px-3 py-2 text-xs outline-none focus:border-[#C9A96E]/60"
                  />
                  <span className="text-[#8A8A8A] text-xs">—</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                    className="w-full bg-[#141414] border border-[#C9A96E]/20 text-[#F5F5F5] placeholder-[#8A8A8A] px-3 py-2 text-xs outline-none focus:border-[#C9A96E]/60"
                  />
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-[#C9A96E] hover:text-[#E2C895] text-xs tracking-widest uppercase transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </aside>

          {/* Mobile filters drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/60" onClick={() => setFiltersOpen(false)} />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                className="absolute top-0 left-0 h-full w-72 bg-[#141414] p-6 overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[#F5F5F5] text-sm tracking-widest uppercase">Filters</h3>
                  <button onClick={() => setFiltersOpen(false)} className="text-[#8A8A8A]">
                    <X size={18} />
                  </button>
                </div>
                <div className="mb-6">
                  <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">Category</p>
                  {['', 'Men', 'Women', 'Unisex'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { updateCategory(cat); setFiltersOpen(false); }}
                      className={`block w-full text-left py-2 text-sm border-b border-[#C9A96E]/10 transition-colors ${
                        category === cat ? 'text-[#C9A96E]' : 'text-[#8A8A8A]'
                      }`}
                    >
                      {cat || 'All'}
                    </button>
                  ))}
                </div>
                <div className="mb-6">
                  <p className="text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">Price Range</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      placeholder="Min"
                      className="w-full bg-[#1C1C1C] border border-[#C9A96E]/20 text-[#F5F5F5] placeholder-[#8A8A8A] px-3 py-2 text-xs outline-none"
                    />
                    <span className="text-[#8A8A8A] text-xs">—</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      placeholder="Max"
                      className="w-full bg-[#1C1C1C] border border-[#C9A96E]/20 text-[#F5F5F5] placeholder-[#8A8A8A] px-3 py-2 text-xs outline-none"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-[#8A8A8A] text-sm">
                {loading ? 'Loading...' : `${products.length} fragrance${products.length !== 1 ? 's' : ''}`}
              </p>
              {/* Category pills */}
              <div className="hidden md:flex gap-2">
                {['', 'Men', 'Women', 'Unisex'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateCategory(cat)}
                    className={`px-3 py-1 text-xs tracking-wider uppercase border transition-colors duration-200 ${
                      category === cat
                        ? 'border-[#C9A96E] text-[#C9A96E] bg-[#C9A96E]/10'
                        : 'border-[#C9A96E]/20 text-[#8A8A8A] hover:border-[#C9A96E]/50'
                    }`}
                  >
                    {cat || 'All'}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-[#1C1C1C] rounded-xl animate-pulse" style={{ aspectRatio: '4/5' }} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="text-6xl mb-6">🌸</div>
                <h3
                  className="text-xl text-[#F5F5F5] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  No fragrances found
                </h3>
                <p className="text-[#8A8A8A] text-sm mb-6">Try adjusting your filters or search query.</p>
                <button
                  onClick={clearFilters}
                  className="text-[#C9A96E] hover:text-[#E2C895] text-sm tracking-widest uppercase transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((p) => (
                  <motion.div key={p._id} variants={fadeInUp}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
