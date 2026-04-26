// ============================================================
// TestimonialsSection.tsx
// Auto-carousel showing 3 testimonial cards at once.
// Cards shift automatically every 4s with smooth slide.
// Hero-matched heading in two lines.
// ============================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserCheck, UserRound, Medal, LockKeyhole, Zap, Globe, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'CEO, TechStartup Pvt. Ltd.',
    icon: User,
    rating: 5,
    text: 'Klanvision transformed our outdated website into a modern, fast, and beautiful platform. Our conversions increased by 180% within three months of launch. Absolutely outstanding work!',
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Head, RetailBrand',
    icon: UserCheck,
    rating: 5,
    text: 'The SEO and digital marketing team at Klanvision is phenomenal. We went from page 8 to page 1 on Google for our key terms. The ROI has been exceptional.',
  },
  {
    name: 'Aditya Reddy',
    role: 'Founder, HealthTech Solutions',
    icon: UserRound,
    rating: 5,
    text: 'Our mobile app was delivered on time with zero bugs. The UI/UX design exceeded our expectations. Klanvision truly understands the healthcare domain. Highly recommended!',
  },
  {
    name: 'Sneha Patel',
    role: 'CTO, FinServe Inc.',
    icon: User,
    rating: 5,
    text: 'The cloud migration was seamless. Zero downtime, perfect documentation, and the team stayed with us through every step. Klanvision is now our go-to technology partner.',
  },
  {
    name: 'Vikram Joshi',
    role: 'Director, LogiTrack Solutions',
    icon: UserCheck,
    rating: 5,
    text: 'Our delivery tracking app handles 10,000+ shipments daily without a hitch. The real-time GPS integration is flawless. Truly world-class mobile engineering.',
  },
  {
    name: 'Meera Nair',
    role: 'VP Digital, EduLearn Platform',
    icon: UserRound,
    rating: 5,
    text: 'Klanvision rebuilt our entire e-learning platform. Page load times dropped by 70% and student engagement tripled. They really understand user experience at scale.',
  },
];

export default function TestimonialsSection() {
  // Track which "page" of 3 cards is shown
  const totalPages = Math.ceil(testimonials.length / 3);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPage(prev => (prev + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalPages]);

  // Get current 3 cards
  const startIdx = page * 3;
  const visible = testimonials.slice(startIdx, startIdx + 3);

  return (
    <section id="testimonials" style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">

        {/* ── Section Header – Hero-matched, two lines */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <div className="accent-bar" />
          <h2
            className="font-bold tracking-tight text-[#1F2937]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)',
              fontWeight: 700, lineHeight: 1.15,
              letterSpacing: '-0.02em', marginBottom: 16,
            }}
          >
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16, maxWidth: 540, margin: '0 auto', lineHeight: 1.7, fontFamily: "'Roboto','Poppins',sans-serif" }}>
            Real stories from businesses that transformed their digital presence with Klanvision.
          </p>
        </motion.div>

        {/* ── Auto-Carousel – 3 cards at a time */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 340 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ x: direction > 0 ? 600 : -600, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -600 : 600, opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{ position: 'absolute', width: '100%', top: 0, left: 0 }}
            >
              {visible.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="testimonial-card"
                >
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <span key={si} style={{ color: '#FBBF24' }}><Star size={16} fill="currentColor" /></span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p style={{
                    color: '#374151', fontSize: 15, lineHeight: 1.75, marginBottom: 24,
                    fontStyle: 'italic', fontFamily: "'Roboto','Poppins',sans-serif",
                  }}>
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: 'white',
                    }}>
                      <t.icon size={22} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: 16 }}>{t.name}</div>
                      <div style={{ color: '#9CA3AF', fontSize: 13, marginTop: 2, fontFamily: "'Roboto',sans-serif" }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Dot Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 36 }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setDirection(i > page ? 1 : -1); setPage(i); }}
              animate={{
                width: i === page ? 28 : 10,
                background: i === page
                  ? 'linear-gradient(90deg, #6366f1, #a855f7)'
                  : '#D1D5DB',
              }}
              transition={{ duration: 0.35 }}
              style={{ height: 10, borderRadius: 5, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        {/* ── Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 56, flexWrap: 'wrap' }}
        >
          {[
            { icon: Medal,       text: 'ISO Certified Quality'  },
            { icon: LockKeyhole, text: 'Data Privacy Compliant' },
            { icon: Zap,         text: '99.9% Uptime SLA'       },
            { icon: Globe,       text: 'Global-Ready Solutions' },
          ].map((b) => (
            <div key={b.text} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#F5F6FA', borderRadius: 50,
              padding: '10px 22px', fontSize: 14, fontWeight: 600, color: '#374151',
              fontFamily: "'Poppins',sans-serif",
            }}>
              <span style={{ display: 'flex', alignItems: 'center', color: '#4F46E5' }}><b.icon size={18} /></span>
              {b.text}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
