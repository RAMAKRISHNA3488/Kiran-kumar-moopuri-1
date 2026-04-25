// ============================================================
// ContactSection.tsx
// Contact form + company info section for Klanvision.
// Left column: connect card with contact details + support image.
// Right column: form with name, phone, email, message fields.
// Form submits via FormSubmit (no server/API key needed).
// Shows success state with animation after submission.
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  // Form field values
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);  // show success state
  const [loading, setLoading]     = useState(false);  // disable button while sending

  // Generic change handler for all text inputs and textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  // handleSubmit – POSTs the form as JSON to FormSubmit's AJAX endpoint.
  // On success sets submitted=true (shows thank-you screen),
  // on failure shows an alert with the error message.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending email using FormSubmit (normal email handler, no access keys required)
      const response = await fetch('https://formsubmit.co/ajax/ramak3488@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          _subject: 'New Strategic Consultation Request - KlanVision',
          _template: 'table',    // email format
          _captcha: 'false',     // disable captcha for smoother UX
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);  // show thank-you screen
      } else {
        alert('Something went wrong. Please try again!');
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  return (
    // Section – white background with decorative blobs
    <section id="contact" style={{ background: 'white', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative radial gradient blobs */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08), transparent)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative' }}>

        {/* Section Header – accent bar + heading + subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div className="accent-bar" />
          <h2 className="font-bold tracking-tight text-[#1F2937]" style={{ marginBottom: 16 }}>
            Connect with Our <span className="gradient-text">Team of Experts</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Collaborate with our skilled team to bring your project ideas into reality, guided by a passion for excellence and innovation.
          </p>
        </motion.div>

        {/* Two-column layout: left = info, right = form */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">

          {/* Left – Contact info card + support image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
          >
            {/* Connect card – icon + heading + contact detail rows */}
            <div className="card" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
                {/* Section icon */}
                <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 20, color: 'white' }}>
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Looking to connect?</h3>
                  <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65 }}>Looking to connect with a team of talented professionals? Please visit our contact form →</p>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: '#F3F4F6', marginBottom: 24 }} />

              {/* Contact detail rows – phone, email, location */}
              {[
                { icon: Phone,  label: 'Phone',    val: '+91 93802 02408'                    },
                { icon: Mail,   label: 'Email',    val: 'hello@klanvision.com'               },
                { icon: MapPin, label: 'Location', val: 'Anantapur, Andhra Pradesh, India'   },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  {/* Icon badge */}
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(79,70,229,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#4F46E5' }}>
                    <c.icon size={20} />
                  </div>
                  <div>
                    <div style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 500 }}>{c.label}</div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginTop: 2 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Support image with gradient overlay and caption */}
            <motion.div whileHover={{ scale: 1.02 }} style={{ borderRadius: 20, overflow: 'hidden', position: 'relative', height: 220, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <img src="/contact.png" alt="Customer support" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(79,70,229,0.7), transparent)' }} />
              {/* Caption overlaid on the image */}
              <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
                <div style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 18 }}>24/7 Expert Support</div>
                <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4 }}>Always here to help you succeed</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right – Contact Form */}
          <motion.div
            id="contact-form"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="card" style={{ padding: '40px' }}>
              {submitted ? (
                // Success state – shown after successful form submission
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                  <div style={{ marginBottom: 24 }}>
                    {/* Brand icon */}
                    <div style={{ width: 80, height: 80, borderRadius: 20, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 10px 25px rgba(79,70,229,0.3)' }}>
                      <span style={{ color: 'white', fontWeight: 900, fontSize: 32 }}>K</span>
                    </div>
                    {/* Green checkmark icon */}
                    <div style={{ color: '#10B981', display: 'flex', justifyContent: 'center' }}><CheckCircle size={48} /></div>
                  </div>
                  <h3 style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 26, marginBottom: 8 }}>Thank You!</h3>
                  <p style={{ color: '#6B7280', marginBottom: 28, fontSize: 15, lineHeight: 1.6 }}>
                    Your professional inquiry has been received. <br />
                    Our team will review your requirements and get back to you shortly.
                  </p>
                  {/* Reset button to allow another message */}
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }} className="btn-primary">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: 22, marginBottom: 28 }}>Send us a Message</h3>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                    {/* Name field */}
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                      <input id="contact-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className="form-input" />
                    </div>

                    {/* Phone field */}
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5 19.79 19.79 0 0 1 1.61 2 2 2 0 0 1 3.58 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.59 6.59l.58-.58a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </span>
                      <input id="contact-phone" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="form-input" />
                    </div>

                    {/* Email field */}
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                        <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </span>
                      <input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email Address" required className="form-input" />
                    </div>

                    {/* Message textarea */}
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 14, top: 14, pointerEvents: 'none' }}>
                        <svg width="16" height="16" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </span>
                      <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Your Message" required className="form-input" />
                    </div>

                    {/* Submit button – shows spinner while loading */}
                    <motion.button
                      id="contact-submit"
                      type="submit"
                      disabled={loading}
                      whileHover={!loading ? { scale: 1.02 } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      className="btn-primary"
                      style={{ justifyContent: 'center', padding: '16px', fontSize: 16, marginTop: 4, opacity: loading ? 0.85 : 1 }}
                    >
                      {loading ? (
                        <>
                          {/* Spinning loader icon */}
                          <svg className="spin-slow" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24" style={{ animation: 'spin-slow 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit
                          <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Keyframe for the loading spinner */}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
