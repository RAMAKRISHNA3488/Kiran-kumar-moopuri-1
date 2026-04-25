// ============================================================
// ServicesSection.tsx
// Core services section for Klanvision.
// Displays 8 service cards in a 4-column responsive grid.
// Each card has a colored top accent, icon, title, description,
// and a "Read More" arrow button.
// ============================================================

import { motion } from 'framer-motion';
import { Monitor, Lightbulb, Lock, Globe, Smartphone, Cloud, RefreshCw, Plug } from 'lucide-react';

// Service card data – icon, title, description, brand color, tinted background
const services = [
  {
    icon: Monitor, title: 'Managed Services',
    desc: 'Streamline your operations and prioritize your business goals. Proactive IT management ensures your systems run smoothly and efficiently.',
    color: '#4F46E5', bg: 'rgba(79,70,229,0.07)',
  },
  {
    icon: Lightbulb, title: 'IT Consultation and Advisory',
    desc: 'Strategic IT investments, predictive management, and optimized solutions for growth.',
    color: '#F97316', bg: 'rgba(249,115,22,0.07)',
  },
  {
    icon: Lock, title: 'Securing Your Digital Infrastructure',
    desc: 'Protect your systems with advanced cybersecurity, identity management, and compliance strategies.',
    color: '#EF4444', bg: 'rgba(239,68,68,0.07)',
  },
  {
    icon: Globe, title: 'Web Development',
    desc: 'Build scalable, modern, and secure web applications tailored to your business needs.',
    color: '#10B981', bg: 'rgba(16,185,129,0.07)',
  },
  {
    icon: Smartphone, title: 'Mobile App Design & Deployment',
    desc: 'Create mobile apps that deliver value and seamless experiences across iOS and Android platforms.',
    color: '#8B5CF6', bg: 'rgba(139,92,246,0.07)',
  },
  {
    icon: Cloud, title: 'Cloud Services',
    desc: 'Agile cloud solutions for faster innovation and scalability. Migrate, manage, and modernize your infrastructure.',
    color: '#06B6D4', bg: 'rgba(6,182,212,0.07)',
  },
  {
    icon: RefreshCw, title: 'Website Upgrade or Migration Service',
    desc: 'Upgrade and migrate systems for better performance, visibility, and modern standards.',
    color: '#6366F1', bg: 'rgba(99,102,241,0.07)',
  },
  {
    icon: Plug, title: 'API Integration',
    desc: 'Integrate systems securely for smooth communication and data flow across platforms.',
    color: '#EC4899', bg: 'rgba(236,72,153,0.07)',
  },
];

export default function ServicesSection() {
  return (
    // Section – light gray background
    <section id="services" style={{ background: '#F5F6FA', padding: '80px 0' }}>
      <div className="container">

        {/* Section Header – accent bar + heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="accent-bar" />
          <h2 className="font-bold tracking-tight text-[#1F2937]" style={{ marginBottom: 16 }}>
            Services &amp; <span className="gradient-text">Solutions</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            Embark on a transformative journey with Klanvision's robust and efficient technology services to elevate your IT company to new heights.
          </p>
        </motion.div>

        {/* Cards Grid – 1 col mobile, 2 cols sm, 4 cols lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}  // staggered entry
              whileHover={{ y: -8 }}                           // lift on hover
              className="card"
              style={{ padding: '32px 24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Top color accent bar – matches service color */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: s.color, borderRadius: '20px 20px 0 0' }} />

              {/* Icon container – rounded square with tinted background */}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 20,
                transition: 'transform 0.3s ease',
                color: s.color,
              }}>
                <s.icon size={28} />
              </div>

              {/* Service title and description */}
              <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
              <p style={{ color: '#6B7280', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</p>

              {/* Read More button – slides right on hover */}
              <motion.button
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  color: s.color, fontWeight: 700, fontSize: 13,
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, fontFamily: 'sans-serif',
                }}
              >
                Read More
                <svg width="16" height="16" fill="none" stroke={s.color} strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
