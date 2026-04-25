// ============================================================
// WhyPartner.tsx
// "Why Partner with Us?" section for Klanvision.
// Contains:
//  1. Reason cards (3-col grid) – key differentiators
//  2. Animated stat counters (4-col grid) – live numbers
//  3. CTA banner – gradient background with call-to-action
// ============================================================

import { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';
import { Trophy, Timer, Zap, Handshake, TrendingUp, Wrench } from 'lucide-react';

// Reason cards data – icon, title, and short description
const reasons = [
  { icon: Trophy,     title: 'Expert Team',        desc: 'Our developers, designers, and strategists bring years of industry experience to every project.' },
  { icon: Timer,      title: 'Timely Delivery',    desc: 'We respect your timeline and consistently deliver high-quality solutions on schedule.' },
  { icon: Zap,        title: 'Cutting-Edge Tech',  desc: 'We leverage the latest technologies to build modern, scalable, and future-proof solutions.' },
  { icon: Handshake,  title: 'Client-Centered',    desc: 'Your goals are our goals. We work closely with you every step of the way.' },
  { icon: TrendingUp, title: 'Proven Results',     desc: 'Measurable outcomes — from traffic growth to conversion rate improvements.' },
  { icon: Wrench,     title: 'End-to-End Support', desc: 'From ideation to post-launch support, we are your full-cycle technology partner.' },
];

// Stats data – numeric value with optional suffix (e.g. "+", "%")
const stats = [
  { num: '200+', label: 'Projects Delivered' },
  { num: '50+',  label: 'Happy Clients'      },
  { num: '98%',  label: 'Client Satisfaction'},
  { num: '5+',   label: 'Years of Excellence'},
];

// ── StatNumber Component ─────────────────────────────────────
// Animates a number from 0 to its target value over 2 seconds
// using framer-motion's animate() utility. Preserves any
// non-numeric suffix (e.g. "+" or "%").
function StatNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0');
  const numeric = parseInt(value);           // extract the number
  const suffix   = value.replace(/[0-9]/g, ''); // extract suffix (+ or %)

  useEffect(() => {
    const controls = animate(0, numeric, {
      duration: 2,
      onUpdate: (latest) => setDisplay(Math.floor(latest).toString() + suffix),
    });
    return () => controls.stop(); // cleanup animation on unmount
  }, [numeric, suffix]);

  return <span>{display}</span>;
}

export default function WhyPartner() {
  return (
    // Section – white background
    <section id="why-partner" style={{ background: 'white', padding: '80px 0' }}>
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
            Why Partner <span className="gradient-text">with Us?</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Expertise in Website, Mobile App Design, and Digital Marketing Solutions.
          </p>
        </motion.div>

        {/* Reason Cards – 1 col mobile, 2 cols sm, 3 cols lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="card"
              style={{ padding: '28px', display: 'flex', gap: 18, alignItems: 'flex-start', cursor: 'pointer' }}
            >
              {/* Gradient icon badge */}
              <div style={{
                width: 50, height: 50, borderRadius: 14, flexShrink: 0,
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
                color: 'white',
              }}>
                <r.icon size={22} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{r.title}</h3>
                <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65 }}>{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Stat Counters – 4 cards showing live-counting numbers */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
        >
          {stats.map((s) => (
            <div key={s.label} className="stat-card" style={{ position: 'relative' }}>
              {/* Pulsing "LIVE" indicator top-right */}
              <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}
                />
                <span style={{ fontSize: 9, fontWeight: 700, color: '#10B981', letterSpacing: 0.5 }}>LIVE</span>
              </div>
              {/* Animated counter number */}
              <div className="text-[#1F2937]" style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: 36, lineHeight: 1.1 }}>
                <StatNumber value={s.num} />
              </div>
              <div style={{ color: '#6B7280', fontSize: 14, marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Banner – gradient background with dotted pattern overlay */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            borderRadius: 28, overflow: 'hidden', position: 'relative',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            padding: '64px 40px', textAlign: 'center',
          }}
        >
          {/* Subtle dot-pattern texture overlay */}
          <div className="dotted-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} />
          <div style={{ position: 'relative' }}>
            <h3 style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3vw,34px)', color: 'white', marginBottom: 16 }}>
              Ready to Transform Your Digital Presence?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 17, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
              Join 50+ businesses that trust Klanvision to power their digital success.
            </p>
            {/* White CTA button scrolling to contact section */}
            <motion.button
              id="why-partner-cta"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'white', color: '#4F46E5', fontWeight: 800, fontSize: 16,
                padding: '16px 44px', borderRadius: 50, border: 'none', cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)', fontFamily: 'sans-serif',
              }}
            >
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
