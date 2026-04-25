// ============================================================
// PortfolioSection.tsx
// Filterable project portfolio for Klanvision.
// Displays 6 project cards with animated filter tabs.
// Cards animate in/out with scale transitions via AnimatePresence.
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, HeartPulse, BarChart, Cloud, Palette, Truck } from 'lucide-react';

// Filter tab options – "All" shows every project
const tabs = ['All', 'Web Dev', 'Mobile App', 'Digital Marketing', 'Cloud'];

// Project data – each entry has a category matching the filter tabs
const projects = [
  { title: 'E-Commerce Platform',      category: 'Web Dev',          color: '#4F46E5', icon: ShoppingCart, desc: 'A full-stack e-commerce solution with real-time inventory and payment integration.',          tags: ['React', 'Node.js', 'MongoDB']     },
  { title: 'HealthCare Mobile App',    category: 'Mobile App',       color: '#10B981', icon: HeartPulse,   desc: 'Patient management app for clinics with appointment booking and telemedicine.',             tags: ['Flutter', 'Firebase', 'REST API'] },
  { title: 'Brand SEO Campaign',       category: 'Digital Marketing', color: '#F97316', icon: BarChart,     desc: 'Achieved 300% organic traffic growth for a retail brand in 6 months.',                    tags: ['SEO', 'Content', 'Analytics']     },
  { title: 'Cloud Migration Project',  category: 'Cloud',            color: '#06B6D4', icon: Cloud,        desc: 'Migrated legacy infrastructure to AWS with zero downtime deployment.',                     tags: ['AWS', 'Docker', 'Terraform']      },
  { title: 'Corporate Website Redesign', category: 'Web Dev',        color: '#8B5CF6', icon: Palette,      desc: 'Modern, fast-loading redesign for a Fortune 500 consulting firm.',                        tags: ['Next.js', 'Tailwind', 'CMS']      },
  { title: 'Delivery Tracker App',     category: 'Mobile App',       color: '#EC4899', icon: Truck,        desc: 'Real-time delivery tracking with GPS and push notifications.',                            tags: ['React Native', 'Maps API']        },
];

export default function PortfolioSection() {
  // Track which category filter is currently active
  const [active, setActive] = useState('All');

  // Filter projects based on active tab; show all when "All" is selected
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    // Section – white background
    <section id="portfolio" style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">

        {/* Section Header – accent bar + heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div className="accent-bar" />
          <h2 className="font-bold tracking-tight text-[#1F2937]" style={{ marginBottom: 16 }}>
            My <span className="gradient-text">Portfolio</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            A showcase of our best work — from web development to digital campaigns that delivered real results.
          </p>
        </motion.div>

        {/* Filter Tabs – pill buttons that update the active category */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 44 }}>
          {tabs.map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActive(tab)}
              style={{
                padding: '9px 22px', borderRadius: 50, fontSize: 14, fontWeight: 600,
                fontFamily: 'sans-serif', cursor: 'pointer', transition: 'all 0.25s ease',
                // Active tab: gradient fill; inactive: gray outline
                background: active === tab ? 'linear-gradient(90deg, #4F46E5, #7C3AED)' : '#F5F6FA',
                color: active === tab ? 'white' : '#6B7280',
                border: active === tab ? 'none' : '1.5px solid #E5E7EB',
                boxShadow: active === tab ? '0 4px 14px rgba(79,70,229,0.35)' : 'none',
              }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Project Cards Grid – animated layout transitions with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -8 }}
                className="card"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
              >
                {/* Card cover – gradient tint with large category icon */}
                <div style={{
                  height: 180,
                  background: `linear-gradient(135deg, ${p.color}15, ${p.color}30)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 64, position: 'relative', color: p.color,
                }}>
                  <span><p.icon size={64} /></span>
                  {/* Category badge – top-right corner */}
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: p.color, color: 'white', fontSize: 11, fontWeight: 700,
                    padding: '4px 12px', borderRadius: 50, letterSpacing: 0.5,
                  }}>
                    {p.category}
                  </div>
                </div>

                {/* Card body – title, description, tech tags */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
                  {/* Technology tag pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 50,
                        background: `${p.color}12`, color: p.color,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}
