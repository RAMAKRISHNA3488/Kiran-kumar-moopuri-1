// ============================================================
// AboutSection.tsx
// Company overview section for Klanvision.
// Two-column layout: left = team image + milestone tiles,
// right = description paragraphs, highlight list, and a quote.
// ============================================================

import { motion } from 'framer-motion';
import { Calendar, MapPin, Target, Globe } from 'lucide-react';

// Key company highlights rendered as a checkmark bullet list
const highlights = [
  'Specializing in innovative design, web development & digital marketing',
  'Delivering seamless digital services since 2025',
  'Prioritizing quality, efficiency, and customer satisfaction',
  'Combining creativity with smart work to build lasting digital brands',
  'Committed to shaping the digital future with new ideas and innovations',
];

export default function AboutSection() {
  return (
    // Section – light gray background with decorative blob overlays
    <section id="about" style={{ background: '#F5F6FA', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background blobs – indigo top-right, orange bottom-left */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.07), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.07), transparent)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Section Header – accent bar + heading + italic tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="accent-bar" />
          <h2 className="font-bold tracking-tight text-[#1F2937]" style={{ marginBottom: 16 }}>
            About <span className="gradient-text">Us</span>
          </h2>
          <p style={{ color: '#7C3AED', fontSize: 16, fontStyle: 'italic', fontWeight: 500, maxWidth: 580, margin: '0 auto' }}>
            Guiding the digital future with clarity and consistency. Our vision since 2025: Transforming Ideas into Digital Reality.
          </p>
        </motion.div>

        {/* Two-column grid: image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left – Team image with gradient overlay and milestone tiles */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: 'relative' }}
          >
            {/* Image with indigo gradient overlay at the bottom */}
            <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.12)', position: 'relative' }}>
              <img src="/about.png" alt="Klanvision team working" style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(79,70,229,0.35), transparent)' }} />
            </div>

            {/* Milestone tiles – float over bottom of image in a 3-column grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: -36, padding: '0 16px', position: 'relative', zIndex: 2 }}>
              {[
                { icon: Calendar, val: '2025',     lbl: 'Founded'  },
                { icon: MapPin,   val: 'Anantapur', lbl: 'HQ, AP'  },
                { icon: Target,   val: '200+',      lbl: 'Projects' },
              ].map((m, i) => (
                <motion.div
                  key={m.lbl}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="glass"
                  style={{ borderRadius: 16, padding: '14px 10px', textAlign: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div style={{ color: '#4F46E5', marginBottom: 4 }}><m.icon size={24} /></div>
                  <div className="text-[#1F2937]" style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 16 }}>{m.val}</div>
                  <div style={{ color: '#6B7280', fontSize: 11, marginTop: 2 }}>{m.lbl}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – Company description, highlights, and closing quote */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 16 }}
          >
            {/* Badge label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(79,70,229,0.08)', color: '#4F46E5',
              fontWeight: 700, fontSize: 13, padding: '8px 18px', borderRadius: 50,
              width: 'fit-content',
            }}>
              <Globe size={16} /> About Klanvision
            </div>

            {/* Company description paragraphs */}
            <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.8 }}>
              Klanvision is a professional company specializing in innovative design, web development, and digital marketing. Headquartered in <strong style={{ color: '#4F46E5' }}>Anantapur, Andhra Pradesh</strong>, we provide comprehensive solutions for scalable growth across industries.
            </p>

            <p style={{ color: '#6B7280', fontSize: 16, lineHeight: 1.8 }}>
              Since 2025, we have been delivering seamless digital services, ensuring every business achieves its digital goals. At Klanvision, we prioritize quality, efficiency, and customer satisfaction.
            </p>

            {/* Highlights – animated checkmark bullet list */}
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: '#374151', fontSize: 14.5 }}
                >
                  {/* Gradient checkmark icon */}
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  {h}
                </motion.li>
              ))}
            </ul>

            {/* Inspirational quote with left purple border */}
            <div style={{
              borderRadius: 16, padding: '20px 24px',
              background: 'linear-gradient(135deg, rgba(79,70,229,0.05), rgba(124,58,237,0.05))',
              borderLeft: '4px solid #7C3AED',
            }}>
              <p style={{ color: '#7C3AED', fontStyle: 'italic', fontWeight: 500, fontSize: 15, lineHeight: 1.75 }}>
                "Our team focuses on delivering innovative solutions in web design, application development, and cloud services. We are committed to shaping the digital future."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
