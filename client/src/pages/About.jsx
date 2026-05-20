import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const values = [
  {
    title: 'Craftsmanship',
    description: 'Every bottle that carries the Lumière name is the result of months of collaboration between master perfumers, rare ingredient sourcing, and uncompromising quality control.',
    icon: '◈',
  },
  {
    title: 'Heritage',
    description: 'Founded in Paris in 1952, Lumière Parfums has spent over seven decades cultivating relationships with the world\'s finest growers, distillers, and artisans.',
    icon: '◆',
  },
  {
    title: 'Exclusivity',
    description: 'Our fragrances are produced in limited quantities. This is not marketing — it is a commitment to quality over volume, and individuality over mass appeal.',
    icon: '✦',
  },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A0A0A]"
    >
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-4">Our Story</p>
          <h1
            className="text-4xl md:text-6xl text-[#F5F5F5]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The House of Lumière
          </h1>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h2
            className="text-2xl md:text-3xl text-[#F5F5F5] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Born in Paris, 1952
          </h2>
          <p className="text-[#8A8A8A] text-base leading-relaxed mb-6">
            In a small atelier on the Île Saint-Louis, perfumer Henri Lumière crafted what would become the most storied fragrance house of the post-war era. With a single composition — a bold chypre that defied convention — Henri announced to the world that perfumery was not just commerce, but high art.
          </p>
          <p className="text-[#8A8A8A] text-base leading-relaxed mb-6">
            For over seventy years, Lumière Parfums has remained in the family. Each generation of master perfumers has added to the house's olfactory vocabulary, while honoring the principles Henri established: rarity, integrity, and an obsessive pursuit of beauty.
          </p>
          <p className="text-[#8A8A8A] text-base leading-relaxed">
            Today, we source the finest ingredients from fifty-three countries — Bulgarian roses harvested at dawn, oud resin tapped from centuries-old trees in Assam, ambergris collected ethically from French Atlantic shores. We do not compromise. We never have.
          </p>
        </motion.div>
      </section>

      {/* Divider with gold ornament */}
      <motion.div
        variants={fadeInUp}
        whileInView="visible"
        initial="hidden"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/40" />
        <span className="text-[#C9A96E] text-xl">✦</span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A96E]/40" />
      </motion.div>

      {/* Values Section */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={fadeInUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-3">What We Stand For</p>
            <h2
              className="text-3xl md:text-4xl text-[#F5F5F5]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                variants={fadeInUp}
                whileInView="visible"
                initial="hidden"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#141414] border border-[#C9A96E]/20 rounded-xl p-8 hover:border-[#C9A96E]/40 transition-colors duration-300"
              >
                <div className="text-[#C9A96E] text-3xl mb-4">{val.icon}</div>
                <h3
                  className="text-xl text-[#F5F5F5] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {val.title}
                </h3>
                <p className="text-[#8A8A8A] text-sm leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 px-4 bg-[#141414] border-t border-b border-[#C9A96E]/10">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <p
            className="text-2xl md:text-3xl text-[#C9A96E] italic leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            "A great perfume is a passport. It carries you to places you have never been, and memories of those you love most."
          </p>
          <p className="text-[#8A8A8A] text-xs tracking-[0.3em] uppercase mt-6">— Henri Lumière, 1952</p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
        >
          <h2
            className="text-2xl md:text-3xl text-[#F5F5F5] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Experience the Collection
          </h2>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#C9A96E] hover:bg-[#E2C895] text-[#0A0A0A] px-8 py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200"
          >
            Shop Now
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
}
