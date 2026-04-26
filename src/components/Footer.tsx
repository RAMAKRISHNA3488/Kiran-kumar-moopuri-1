// ============================================================
// Footer.tsx
// Site footer for Klanvision.
// Four-column grid: brand/socials | quick links | legal | contact.
// Includes a top gradient accent, decorative blobs, dot field
// with cursor-tracking spotlight, divider, copyright + back-to-top.
// ============================================================

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import DotGrid from './DotGrid';

// Quick navigation links shown in the footer
const quickLinks = ['Home', 'Services', 'My Portfolio', 'About', 'Contact'];

// Legal policy links
const legalLinks = [
  'Terms & Conditions',
  'Service Policy',
  'Privacy Policy',
  'Cancellation Policy',
  'Refund & Return Policy',
  'FAQs',
];

// Social media platforms with icon, label, and brand color
const socials = [
  { icon: FaFacebook, label: 'Facebook', color: '#1877F2' },
  { icon: FaTwitter, label: 'Twitter', color: '#1DA1F2' },
  { icon: FaInstagram, label: 'Instagram', color: '#E4405F' },
  { icon: FaLinkedin, label: 'LinkedIn', color: '#0A66C2' },
  { icon: FaYoutube, label: 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  // Smooth scroll helper used for quick links navigation
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    // Footer – dark background matches DotField glowColor for seamless blend
    <footer style={{ background: '#120F17', color: 'white', position: 'relative', overflow: 'hidden' }}>
      {/* Top gradient accent bar */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #FF6B35, #7C3AED)', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }} />

      {/* DotGrid – interactive dot canvas with proximity glow & click shockwave */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <DotGrid
          dotSize={3}
          gap={18}
          baseColor="#2A2237"
          activeColor="#A855F7"
          proximity={130}
          shockRadius={260}
          shockStrength={4}
          returnDuration={1.2}
        />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Main 4-column grid – collapses to 2 cols on tablet, 1 col on mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48, padding: '64px 0 48px' }} className="footer-grid">

          {/* Column 1: Brand + tagline + social buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >
            {/* Logo mark + wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'white', fontWeight: 900, fontFamily: 'sans-serif', fontSize: 20 }}>K</span>
              </div>
              <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: 22, letterSpacing: 1 }}>
                {/* "KLAN" in gradient, "VISION" in white */}
                <span style={{ background: 'linear-gradient(135deg, #818CF8, #A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>KLAN</span>
                <span style={{ color: 'white' }}> VISION</span>
              </span>
            </div>

            {/* Tagline */}
            <p style={{ color: '#9CA3AF', fontSize: 14, lineHeight: 1.75 }}>
              Transforming the Future of Technology | Empowering Businesses with Enhanced Digital Solutions.
            </p>

            {/* Social icon buttons – hover reveals platform brand color */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {socials.map(s => (
                <motion.button
                  key={s.label}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={s.label}
                  style={{
                    width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 11,
                    transition: 'background 0.2s', fontFamily: 'sans-serif',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = s.color)}   // brand color on hover
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
                >
                  <s.icon size={18} />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 24, color: 'white' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {quickLinks.map(link => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link.toLowerCase().replace(' ', '-'))}
                    className="footer-link"
                    style={{ background: 'none', border: 'none' }}
                  >
                    {/* Orange arrow – revealed on hover via CSS */}
                    <span style={{ fontSize: 10, color: '#FF6B35', opacity: 0, transition: 'opacity 0.2s' }} className="link-dot">▶</span>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h4 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 24, color: 'white' }}>Legal</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {legalLinks.map(link => (
                <li key={link}>
                  <a href="#" className="footer-link" style={{ textDecoration: 'none', fontSize: 13 }}>{link}</a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 24, color: 'white' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { icon: Phone, val: '+91 98765 43210' },
                { icon: Mail, val: 'hello@klanvision.com' },
                { icon: MapPin, val: 'Anantapur, Andhra Pradesh, India' },
              ].map(c => (
                <div key={c.val} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {/* Orange icon badge */}
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF6B35', flexShrink: 0 }}>
                    <c.icon size={16} />
                  </div>
                  <span style={{ color: '#9CA3AF', fontSize: 13.5, lineHeight: 1.55, paddingTop: 6 }}>{c.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Horizontal divider above the bottom bar */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />

        {/* Bottom Bar – copyright + back-to-top button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#6B7280', fontSize: 13.5 }}>© 2025 Klanvision Company. All rights reserved.</p>
          {/* Back to top – scrolls to page top smoothly */}
          <motion.button
            whileHover={{ scale: 1.06, y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#6B7280', fontSize: 13.5, display: 'flex', alignItems: 'center',
              gap: 6, fontFamily: 'sans-serif', transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF6B35')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>

      {/* Footer-specific hover styles and responsive grid breakpoints */}
      <style>{`
        .footer-link:hover { color: #FF6B35 !important; }
        .footer-link:hover .link-dot { opacity: 1 !important; }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px)  { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
