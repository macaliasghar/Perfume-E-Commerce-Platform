import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!', {
        style: { background: '#1C1C1C', color: '#F5F5F5', border: '1px solid #C9A96E' },
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#C9A96E]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span
              className="text-2xl font-bold tracking-widest text-[#C9A96E] block mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Lumière
            </span>
            <p className="text-[#8A8A8A] text-sm leading-relaxed max-w-xs">
              Crafting extraordinary fragrances since 1952. Where artistry meets the ancient alchemy of scent.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#8A8A8A] hover:text-[#C9A96E] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-[#8A8A8A] hover:text-[#C9A96E] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-[#8A8A8A] hover:text-[#C9A96E] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#F5F5F5] text-xs tracking-[0.2em] uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: 'About', to: '/about' },
                { label: 'Cart', to: '/cart' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#8A8A8A] hover:text-[#C9A96E] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#F5F5F5] text-xs tracking-[0.2em] uppercase mb-6">Newsletter</h4>
            <p className="text-[#8A8A8A] text-sm mb-4">
              Subscribe for exclusive launches, private events, and olfactory inspirations.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-[#1C1C1C] border border-[#C9A96E]/30 text-[#F5F5F5] placeholder-[#8A8A8A] px-4 py-2 text-sm outline-none focus:border-[#C9A96E] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] px-4 py-2 text-sm font-medium tracking-wider transition-colors duration-200"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#C9A96E]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#8A8A8A] text-xs">
            © 2026 Lumière Parfums. All rights reserved.
          </p>
          <p className="text-[#8A8A8A] text-xs tracking-widest">
            THE ART OF SCENT
          </p>
        </div>
      </div>
    </footer>
  );
}
