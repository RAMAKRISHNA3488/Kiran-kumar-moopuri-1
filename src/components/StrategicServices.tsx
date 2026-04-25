// ============================================================
// StrategicServices.tsx
// Displays a grid of 8 strategic digital service cards.
// Each card animates into view on scroll with a staggered
// delay. Section heading includes accent bar above and a
// multi-color gradient underline below the title.
// ============================================================

import { motion } from 'framer-motion';
import { Search, Megaphone, Target, Headphones, BarChart3, ShoppingCart, Lock, Handshake } from 'lucide-react';

// ── Service Data ────────────────────────────────────────────
// Each item defines the icon, label, icon color, and
// light tinted icon background color used on every card.
const services = [
  { icon: Search,       label: 'SEO Services',              color: '#4F46E5', bg: 'rgba(79,70,229,0.08)'   },
  { icon: Megaphone,    label: 'Social Marketing',          color: '#EC4899', bg: 'rgba(236,72,153,0.08)'  },
  { icon: Target,       label: 'PPC Advertising',           color: '#F97316', bg: 'rgba(249,115,22,0.08)'  },
  { icon: Headphones,   label: 'Quick Support',             color: '#10B981', bg: 'rgba(16,185,129,0.08)'  },
  { icon: BarChart3,    label: 'Web Analytics Integration', color: '#8B5CF6', bg: 'rgba(139,92,246,0.08)'  },
  { icon: ShoppingCart, label: 'E-Commerce Solutions',      color: '#06B6D4', bg: 'rgba(6,182,212,0.08)'   },
  { icon: Lock,         label: 'Cybersecurity Services',    color: '#EF4444', bg: 'rgba(239,68,68,0.08)'   },
  { icon: Handshake,    label: 'Customer Strategy',         color: '#6366F1', bg: 'rgba(99,102,241,0.08)'  },
];

export default function StrategicServices() {
  return (
    // Section wrapper – white background, generous vertical padding
    <section id="strategic-services" style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">

        {/* ── Section Header ──────────────────────────────────────
            Fades and slides up when it enters the viewport (once).
            Contains:
              1. accent-bar  – short gradient bar above the heading
              2. h2 heading  – main section title with gradient text
              3. underline   – multi-color gradient bar below heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}        // animate only the first time it enters view
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          {/* Short orange-to-purple accent bar above the heading (defined in index.css) */}
          <div className="accent-bar" />

          {/* Section heading with gradient-colored highlight */}
          <h2 className="font-bold tracking-tight text-[#1F2937]">
            Strategic Application Services for{' '}
            <span className="gradient-text">Seamless Online Success</span>
          </h2>


        </motion.div>

        {/* ── Service Cards Grid ───────────────────────────────────
            Responsive grid: 1 col on mobile, 2 on sm, 4 on lg.
            Each card animates in on scroll with a staggered delay. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}  // staggered entry delay per card
              whileHover={{ y: -8, scale: 1.02 }}              // lift effect on hover
              className="card"
              style={{ padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, cursor: 'pointer' }}
            >
              {/* Icon container – rounded square with tinted background matching service color */}
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28,
                transition: 'transform 0.3s ease',
                color: s.color,
              }}>
                {/* Lucide icon rendered at 28px */}
                <s.icon size={28} />
              </div>

              {/* Service label */}
              <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>{s.label}</span>

              {/* Small color-coded accent line at the bottom of each card */}
              <div style={{ width: 32, height: 3, borderRadius: 2, background: s.color, opacity: 0.6 }} />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
