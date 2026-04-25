// ============================================================
// Hero.tsx
// Full-screen hero section for the Klanvision landing page.
// Includes animated heading, feature list, CTA buttons,
// stats, a floating image with decorative rings, and a
// centered scroll-down indicator.
// ============================================================

import { motion } from 'framer-motion';
import { Rocket, Star } from 'lucide-react';

// Generate 80 dots for the decorative dotted grid background pattern
const dots = Array.from({ length: 80 });

export default function Hero() {
  // Smooth-scroll helper: scrolls to the element with the given id
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    // Main hero section — full viewport height, gradient background, overflow hidden for decorative elements
    <section id="hero" className="hero-bg" style={{ minHeight: '100vh', paddingTop: 'clamp(72px, 12vw, 100px)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

      {/* ── Decorative Background Layer ────────────────────────────
          Contains blurred radial gradient blobs and a dotted grid.
          pointer-events: none so it never blocks user interaction. */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {/* Top-right indigo blob */}
        <div style={{ position: 'absolute', top: -120, right: -120, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%)', filter: 'blur(40px)' }} />
        {/* Bottom-left orange blob */}
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.12), transparent 70%)', filter: 'blur(30px)' }} />
        {/* Dotted grid – 8-column grid of small purple circles */}
        <div style={{ position: 'absolute', top: 80, right: 60, display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 14, opacity: 0.5 }}>
          {dots.map((_, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#7C3AED', opacity: 0.4 }} />)}
        </div>
      </div>

      {/* ── Main Content Container ─────────────────────────────────
          Two-column grid (left: text content, right: image).
          Collapses to single column on tablet/mobile via .hero-grid media query. */}
      <div className="container" style={{ padding: '60px 0', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid">

          {/* ── LEFT COLUMN: Text Content ────────────────────────── */}
          <motion.div initial={{ x: -60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Badge – animated entry from the left, displays brand tagline */}
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 3.5, ease: 'easeOut' }}>
              <div className="badge">
                WELCOME TO KLANVISION
              </div>
            </motion.div>

            {/* Main Heading – fluid font size matching section h2 style */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold tracking-tight text-[#1F2937]"
              style={{ fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3.5rem)' }}
            >
              Unique, Safe, and{' '}
              <br className="hidden lg:block" />
              {/* Gradient colored highlight for "Scalable Digital Innovations" */}
              <span className="gradient-text">Scalable Digital Innovations</span>{' '}
              <br className="hidden md:block" />
              for Corporate Success
            </motion.h1>

            {/* Description paragraph – short company value proposition */}
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="hero-description" style={{ maxWidth: 520 }}>
              We deliver high-quality, scalable, and secure digital solutions, ensuring businesses achieve their project goals. Our tailored and efficient approaches ensure every project turns into a resounding success story.
            </motion.p>

            {/* Feature List – three key selling points with checkmark icons */}
            <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="hero-features" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['High-Quality Digital Solutions', 'Scalable & Secure Architecture', 'Tailored Business Approaches'].map((f, i) => (
                // Each item slides in from left with a staggered delay
                <motion.li key={f} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, fontWeight: 500 }}>
                  {/* Custom SVG checkmark icon */}
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="rgba(79,70,229,0.12)" />
                    <path d="M8 12l3 3 5-5" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </motion.li>
              ))}
            </motion.ul>

            {/* Call-to-Action Buttons – primary (Get Started) and outline (Learn More) */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="hero-ctas" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {/* Primary CTA – scrolls to contact section */}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} id="hero-get-started"
                onClick={() => scrollTo('contact')} className="btn-primary" style={{ fontSize: 16, padding: '14px 36px' }}>
                GET STARTED
                <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </motion.button>
              {/* Secondary CTA – scrolls to about section */}
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} id="hero-learn-more"
                onClick={() => scrollTo('about')} className="btn-outline" style={{ fontSize: 16, padding: '14px 36px' }}>
                Learn More
              </motion.button>
            </motion.div>

            {/* Stats Row – highlights key company metrics */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
              className="hero-stats" style={{ display: 'flex', gap: 24 }}>
              {[['200+', 'Projects Done'], ['50+', 'Happy Clients'], ['5+', 'Yrs Experience']].map(([num, label]) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  {/* Gradient number – Poppins 900 */}
                  <div className="gradient-text hero-stat-number">{num}</div>
                  {/* Stat label – Roboto 500 */}
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN: Hero Image with Decorative Rings ───── */}
          <motion.div initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative', marginTop: -150 }}>

            {/* Pulse rings – three concentric fading circles that animate outward */}
            <div className="hero-rings" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 360, height: 360 }}>
              {[1, 1.3, 1.6].map((scale, i) => (
                <div key={i} style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: `2px solid rgba(79,70,229,${0.2 - i * 0.06})`,
                  transform: `scale(${scale})`, animation: `pulse-ring ${2 + i * 0.5}s ease-out infinite ${i * 0.5}s`,
                }} />
              ))}
            </div>

            {/* Slow clockwise rotating outer ring */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 280, height: 280, pointerEvents: 'none' }}>
              <div className="spin-slow" style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(79,70,229,0.1)' }} />
            </div>
            {/* Fast counter-clockwise rotating inner ring */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 160, height: 160, pointerEvents: 'none' }}>
              <div className="spin-reverse" style={{ width: '100%', height: '100%', borderRadius: '50%', border: '1px solid rgba(255,107,53,0.12)' }} />
            </div>

            {/* Floating hero image – gently bobs up and down with a y animation */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-image-wrap"
              style={{
                position: 'relative', width: 300, height: 300, borderRadius: '50%', overflow: 'hidden',
                border: '5px solid white', boxShadow: '0 20px 60px rgba(79,70,229,0.25)',
                background: 'linear-gradient(135deg, #EEF2FF, #F3E8FF)',
              }}
            >
              <img src="/hero.png" alt="Business professional with laptop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Floating Cards – appear with spring animation after a delay */}

            {/* Top-right card: Fast Delivery badge */}
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }}
              className="glass hero-float-card"
              style={{ position: 'absolute', top: '0%', right: '0%', borderRadius: 16, padding: '12px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <div className="float-card-title" style={{ color: '#4F46E5' }}><Rocket size={14} /> Fast Delivery</div>
              <div className="float-card-sub">On time, every time</div>
            </motion.div>

            {/* Bottom-left card: 5-star rating badge */}
            <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4, type: 'spring' }}
              className="glass hero-float-card"
              style={{ position: 'absolute', bottom: '0%', left: '0%', borderRadius: 16, padding: '12px 18px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <div className="float-card-title" style={{ color: '#FF6B35' }}><Star size={14} /> 5.0 Rating</div>
              <div className="float-card-sub">Trusted by 50+ clients</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll Indicator ────────────────────────────────────────
          Centered absolutely at the bottom of the hero section.
          Uses a full-width flex wrapper (left:0, right:0) for reliable
          centering on all screen sizes including mobile. */}
      <div style={{ position: 'absolute', bottom: 32, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Outer bounce animation wrapping both label and mouse icon */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {/* "Scroll down" label – Roboto 500 */}
          <div className="scroll-label">Scroll down</div>
          {/* Mouse-shaped border */}
          <div style={{ width: 22, height: 36, border: '2px solid #9CA3AF', borderRadius: 11, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            {/* Animated scroll dot inside the mouse icon */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 4, height: 8, borderRadius: 2, background: '#9CA3AF' }} />
          </div>
        </motion.div>
      </div>

      {/* ── Responsive Media Queries ────────────────────────────────
          Tablet (≤1024px): stack columns, center-align content.
          Mobile (≤768px): ensure scroll indicator is always visible. */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center !important; }
          .hero-grid > div { align-items: center !important; }
          .hero-grid > div:last-child { margin-top: 0 !important; }
          .hero-features { margin: 0 auto; text-align: left; align-items: flex-start; }
          .hero-ctas { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
        }
        @media (max-width: 768px) {
          .scroll-indicator { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
