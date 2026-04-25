// ============================================================
// TestimonialsSection.tsx
// Client testimonials + trust badges section for Klanvision.
// Displays 3 testimonial cards with star ratings, quotes,
// and author info. Below the cards are 4 trust/certification badges.
// ============================================================

import { motion } from 'framer-motion';
import { User, UserCheck, UserRound, Medal, LockKeyhole, Zap, Globe, Star } from 'lucide-react';

// Testimonial data – each entry has client info and their review text
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
];

export default function TestimonialsSection() {
  return (
    // Section – white background
    <section id="testimonials" style={{ background: 'white', padding: '80px 0' }}>
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
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Real stories from businesses that transformed their digital presence with Klanvision.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid – 1 col mobile, 2 cols md, 3 cols lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -7 }}
              className="testimonial-card"  // styled in index.css with a large quote mark ::before
            >
              {/* Star Rating – renders filled star icons based on rating value */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {Array.from({ length: t.rating }).map((_, si) => (
                  <span key={si} style={{ color: '#FBBF24' }}><Star size={16} fill="currentColor" /></span>
                ))}
              </div>

              {/* Client quote text */}
              <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>
                "{t.text}"
              </p>

              {/* Author info – avatar icon + name + role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
                {/* Gradient avatar circle with person icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0, color: 'white',
                }}>
                  <t.icon size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 16}}>{t.name}</div>
                  <div style={{ color: '#9CA3AF', fontSize: 13, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges – 4 certification/quality indicators below testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 56, flexWrap: 'wrap' }}
        >
          {[
            { icon: Medal,       text: 'ISO Certified Quality'     },
            { icon: LockKeyhole, text: 'Data Privacy Compliant'    },
            { icon: Zap,         text: '99.9% Uptime SLA'          },
            { icon: Globe,       text: 'Global-Ready Solutions'    },
          ].map((b) => (
            // Each badge is a pill with a colored icon and label
            <div key={b.text} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: '#F5F6FA', borderRadius: 50,
              padding: '10px 22px', fontSize: 14, fontWeight: 600, color: '#374151',
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
