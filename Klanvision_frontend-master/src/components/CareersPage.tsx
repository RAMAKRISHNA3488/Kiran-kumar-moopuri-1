import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, MapPin, Clock, Briefcase, Send, X, Code2, Database, 
  Cloud, Smartphone, Layers, Server, Search, Filter, Sparkles, 
  Rocket, Heart, Users, Target, CheckCircle2
} from 'lucide-react';

// --- Job Data ---
const jobs = [
  {
    id: 1, title: 'DevOps Engineer', dept: 'Engineering', location: 'Bangalore, India', type: 'Full-time',
    exp: '3-5 Years', icon: Cloud, color: '#06B6D4',
    desc: 'Design, implement, and manage CI/CD pipelines, cloud infrastructure, and automation frameworks to ensure seamless software delivery and operations.',
    skills: ['AWS / Azure / GCP', 'Docker & Kubernetes', 'Jenkins', 'Terraform', 'Linux', 'Prometheus'],
    responsibilities: ['Build and maintain CI/CD pipelines', 'Manage cloud infrastructure using IaC', 'Implement monitoring and incident response', 'Optimize dev workflows', 'Ensure system security'],
  },
  {
    id: 2, title: 'Frontend Developer', dept: 'Engineering', location: 'Hyderabad, India', type: 'Full-time',
    exp: '2-4 Years', icon: Code2, color: '#8B5CF6',
    desc: 'Build pixel-perfect, responsive, and performant user interfaces using modern JavaScript frameworks with a strong focus on UX and accessibility.',
    skills: ['React.js / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'REST/GraphQL', 'Git'],
    responsibilities: ['Develop responsive web apps from Figma', 'Optimize for speed and scalability', 'Write clean, maintainable code', 'Collaborate with UI/UX designers', 'Participate in code reviews'],
  },
  {
    id: 3, title: 'Backend Developer', dept: 'Engineering', location: 'Bangalore, India', type: 'Full-time',
    exp: '3-5 Years', icon: Server, color: '#10B981',
    desc: 'Architect and develop robust server-side applications, RESTful APIs, and microservices that power enterprise-grade digital products.',
    skills: ['Java / Spring Boot', 'PostgreSQL', 'Redis', 'Docker', 'OAuth2', 'Microservices'],
    responsibilities: ['Design and build scalable APIs', 'Implement business logic layers', 'Optimize database queries', 'Write unit and integration tests', 'Ensure API security'],
  },
  {
    id: 4, title: 'Full Stack Developer', dept: 'Engineering', location: 'Remote', type: 'Full-time',
    exp: '4-6 Years', icon: Layers, color: '#F97316',
    desc: 'Own the complete development lifecycle — from designing frontend interfaces to building backend services and deploying to cloud infrastructure.',
    skills: ['React + Spring Boot', 'TypeScript', 'SQL/NoSQL', 'AWS', 'System Design', 'CI/CD'],
    responsibilities: ['Lead end-to-end feature development', 'Design database schemas', 'Mentor junior developers', 'Drive architectural decisions', 'Collaborate with product teams'],
  },
  {
    id: 5, title: 'Database Engineer', dept: 'Data', location: 'Hyderabad, India', type: 'Full-time',
    exp: '3-5 Years', icon: Database, color: '#EF4444',
    desc: 'Design, optimize, and maintain high-performance database systems that handle millions of transactions with sub-millisecond latency.',
    skills: ['PostgreSQL / MySQL', 'MongoDB', 'Redis', 'Replication', 'Query Optimization', 'Sharding'],
    responsibilities: ['Design scalable DB architectures', 'Optimize slow queries', 'Manage backup and recovery systems', 'Monitor database health', 'Ensure data security'],
  },
  {
    id: 6, title: 'Mobile Developer', dept: 'Mobile', location: 'Bangalore, India', type: 'Full-time',
    exp: '2-4 Years', icon: Smartphone, color: '#EC4899',
    desc: 'Build beautiful, high-performance native and cross-platform mobile applications for iOS and Android that delight millions of users.',
    skills: ['React Native / Flutter', 'Swift / Kotlin', 'Firebase', 'Push Notifications', 'App Store Ops', 'Mobile UX'],
    responsibilities: ['Develop cross-platform mobile apps', 'Integrate with backend APIs', 'Implement real-time features', 'Optimize app performance', 'Manage store releases'],
  },
];

// --- Sub-components ---
const GlassCard = ({ children, style = {}, onClick }: any) => (
  <motion.div
    whileHover={{ y: -8, scale: 1.02 }}
    onClick={onClick}
    style={{
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      borderRadius: 24,
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      overflow: 'hidden',
      ...style
    }}
  >
    {children}
  </motion.div>
);

const BenefitItem = ({ icon: Icon, title, desc }: any) => (
  <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
    <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
      <Icon size={24} />
    </div>
    <div>
      <h4 style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#1F2937' }}>{title}</h4>
      <p style={{ margin: 0, fontSize: 14, color: '#6B7280', lineHeight: 1.5 }}>{desc}</p>
    </div>
  </div>
);

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applyJob, setApplyJob] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', coverLetter: '' });
  const [submitted, setSubmitted] = useState(false);

  const depts = ['All', ...Array.from(new Set(jobs.map(j => j.dept)))];
  
  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          j.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDept = activeDept === 'All' || j.dept === activeDept;
    return matchesSearch && matchesDept;
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/jobs/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          position: applyJob?.title,
          experience: form.experience,
          coverLetter: form.coverLetter
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => { setApplyJob(null); setSubmitted(false); setForm({ name: '', email: '', phone: '', experience: '', coverLetter: '' }); }, 3000);
      } else {
        alert('Submission failed.');
      }
    } catch {
      alert('Network error. Check if backend is running.');
    }
  };

  return (
    <div style={{ background: '#F0F2F5', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      {/* ── Modern Hero Section ── */}
      <section style={{ 
        background: 'radial-gradient(circle at 0% 0%, #120F17 0%, #1E1B4B 100%)', 
        color: 'white', 
        padding: '140px 0 160px', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Animated Background Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [0, -100, 0], 
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: 100 + i * 50,
              height: 100 + i * 50,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />
        ))}

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            <a href="/" style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 8, 
              color: '#818CF8', textDecoration: 'none', fontSize: 13, 
              fontWeight: 800, letterSpacing: 2, marginBottom: 32,
              background: 'rgba(129, 140, 248, 0.1)', padding: '8px 16px', borderRadius: 50
            }}>
              <ChevronLeft size={16} /> BACK TO HOME
            </a>
            <h1 style={{ fontSize: 'clamp(36px, 8vw, 72px)', fontWeight: 900, marginBottom: 24, lineHeight: 1 }}>
              The Future of Tech <br />
              <span className="gradient-text">Starts with You</span>
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: 'clamp(16px, 2vw, 20px)', maxWidth: 700, margin: '0 auto 48px', lineHeight: 1.6 }}>
              Klanvision is where innovation meets ambition. Join our global team of creators, 
              thinkers, and world-class engineers.
            </p>

            {/* Search Bar */}
            <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.1)', 
                backdropFilter: 'blur(20px)', 
                borderRadius: 24, 
                padding: '12px 24px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: 16,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}>
                <Search size={22} color="#818CF8" />
                <input 
                  placeholder="Search positions or skills (e.g. React, AWS)..." 
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ background: 'none', border: 'none', color: 'white', fontSize: 16, outline: 'none', width: '100%' }}
                />
                <div style={{ background: '#4F46E5', padding: '8px 16px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>EXPLORE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Job Postings Section ── */}
      <section className="container" style={{ marginTop: -80, position: 'relative', zIndex: 3, paddingBottom: 100 }}>
        {/* Department Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 48, overflowX: 'auto', paddingBottom: 12, justifyContent: 'center' }} className="no-scrollbar">
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setActiveDept(d)}
              style={{
                whiteSpace: 'nowrap',
                padding: '12px 28px',
                borderRadius: 50,
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
                background: activeDept === d ? '#4F46E5' : 'white',
                color: activeDept === d ? 'white' : '#6B7280',
                boxShadow: activeDept === d ? '0 10px 20px rgba(79,70,229,0.3)' : '0 4px 10px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Job Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 32 }}>
          <AnimatePresence mode="popLayout">
            {filteredJobs.map((job, i) => (
              <GlassCard key={job.id} onClick={() => setSelectedJob(job)}>
                <div style={{ height: 6, background: job.color }} />
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                    <div style={{ 
                      width: 56, height: 56, borderRadius: 18, 
                      background: `${job.color}15`, 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      color: job.color, border: `1px solid ${job.color}30`
                    }}>
                      <job.icon size={28} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 800, color: '#9CA3AF', background: '#F3F4F6', padding: '6px 12px', borderRadius: 50 }}>{job.type}</span>
                  </div>
                  
                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: '#1F2937' }}>{job.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
                    <MapPin size={14} /> {job.location} · <Briefcase size={14} /> {job.exp}
                  </div>
                  
                  <p style={{ color: '#4B5563', fontSize: 14, lineHeight: 1.6, marginBottom: 24, minHeight: 45 }}>
                    {job.desc.substring(0, 100)}...
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                    {job.skills.slice(0, 3).map(s => (
                      <span key={s} style={{ background: 'white', border: '1px solid #E5E7EB', color: '#374151', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700 }}>{s}</span>
                    ))}
                    <span style={{ color: '#4F46E5', fontSize: 11, fontWeight: 700, padding: '6px 0' }}>+{job.skills.length - 3} more</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ color: '#4F46E5', fontWeight: 800, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
                      VIEW DETAILS <Sparkles size={14} />
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronDown size={20} color="#9CA3AF" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: 60, marginBottom: 20 }}>🔍</div>
            <h3 style={{ fontWeight: 800, color: '#1F2937' }}>No positions found</h3>
            <p style={{ color: '#6B7280' }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </section>

      {/* ── Culture & Benefits Section ── */}
      <section style={{ background: 'white', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <span style={{ color: '#4F46E5', fontWeight: 800, letterSpacing: 2, fontSize: 13 }}>LIFE AT KLANVISION</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, marginTop: 12, marginBottom: 24, lineHeight: 1.1 }}>
                Work that feels like <br /><span className="gradient-text">Freedom.</span>
              </h2>
              <p style={{ color: '#6B7280', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
                We believe in autonomy, ownership, and continuous growth. Our culture is built on 
                transparency and the relentless pursuit of excellence.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <BenefitItem icon={Rocket} title="Rapid Growth" desc="Clear paths for career advancement." />
                <BenefitItem icon={Heart} title="Wellness" desc="Comprehensive health and mental support." />
                <BenefitItem icon={Users} title="Global Team" desc="Collaborate with elite talent worldwide." />
                <BenefitItem icon={Target} title="Impact" desc="Build products used by millions." />
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  borderRadius: 40,
                  height: 450,
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(79,70,229,0.2)'
                }}
              >
                <div style={{ padding: 40, color: 'white' }}>
                  <div style={{ fontSize: 40, marginBottom: 20 }}>✨</div>
                  <h3 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16 }}>Join the 1%</h3>
                  <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6 }}>
                    We're not just looking for employees; we're looking for partners who want to 
                    shape the next decade of digital evolution.
                  </p>
                </div>
                {/* Abstract pattern */}
                <div style={{ position: 'absolute', bottom: -20, right: -20, width: 200, height: 200, border: '40px solid rgba(255,255,255,0.1)', borderRadius: '50%' }} />
              </motion.div>
              
              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                style={{
                  position: 'absolute',
                  bottom: 40,
                  left: -40,
                  background: 'white',
                  padding: '24px 32px',
                  borderRadius: 20,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  zIndex: 2
                }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, color: '#4F46E5' }}>98%</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#6B7280' }}>Employee Satisfaction</div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Hiring Process ── */}
      <section className="container" style={{ padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{ fontSize: 36, fontWeight: 900 }}>Our Hiring <span className="gradient-text">Process</span></h2>
          <p style={{ color: '#6B7280' }}>Simple, transparent, and candidate-first.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="process-grid">
          {[
            { step: '01', title: 'Apply', desc: 'Submit your profile for review.' },
            { step: '02', title: 'Tech Interview', desc: 'Showcase your skills with our leads.' },
            { step: '03', title: 'Culture Fit', desc: 'Meet the team and see if we click.' },
            { step: '04', title: 'Offer', desc: 'Welcome to the Klanvision family!' }
          ].map((p, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 80, height: 80, borderRadius: '50%', background: 'white', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                margin: '0 auto 20px', fontSize: 24, fontWeight: 900, color: '#4F46E5',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)', border: '1px solid #E5E7EB'
              }}>
                {p.step}
              </div>
              <h4 style={{ fontWeight: 800, marginBottom: 8 }}>{p.title}</h4>
              <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Job Details Modal ── */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedJob(null)}
            style={{ 
              position: 'fixed', inset: 0, background: 'rgba(15, 10, 26, 0.8)', 
              backdropFilter: 'blur(12px)', zIndex: 1000, 
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
              onClick={e => e.stopPropagation()}
              style={{ 
                background: 'white', width: '100%', maxWidth: 800, maxHeight: '90vh', 
                borderRadius: 32, overflow: 'hidden', display: 'flex', flexDirection: 'column' 
              }}
            >
              {/* Modal Header */}
              <div style={{ background: 'linear-gradient(135deg, #F9FAFB, #F3F4F6)', padding: '40px 48px', borderBottom: '1px solid #E5E7EB', position: 'relative' }}>
                <button onClick={() => setSelectedJob(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'white', border: 'none', width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                  <X size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <div style={{ 
                    width: 72, height: 72, borderRadius: 24, 
                    background: `${selectedJob.color}15`, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: selectedJob.color, border: `1px solid ${selectedJob.color}30`
                  }}>
                    <selectedJob.icon size={36} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 8px', color: '#111827' }}>{selectedJob.title}</h2>
                    <div style={{ display: 'flex', gap: 16, color: '#6B7280', fontSize: 14, fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> {selectedJob.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={16} /> {selectedJob.exp}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '40px 48px', overflowY: 'auto', flex: 1 }}>
                <div style={{ marginBottom: 40 }}>
                  <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    About the Role <Rocket size={18} color="#4F46E5" />
                  </h4>
                  <p style={{ color: '#4B5563', lineHeight: 1.8, fontSize: 16 }}>{selectedJob.desc}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Key Responsibilities</h4>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                      {selectedJob.responsibilities.map((r: string) => (
                        <li key={r} style={{ display: 'flex', gap: 12, marginBottom: 12, color: '#4B5563', fontSize: 15 }}>
                          <CheckCircle2 size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 3 }} /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: 18, marginBottom: 16 }}>Requirements</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {selectedJob.skills.map((s: string) => (
                        <span key={s} style={{ background: '#EEF2FF', color: '#4F46E5', padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 700 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{ padding: '32px 48px', borderTop: '1px solid #E5E7EB', display: 'flex', gap: 16 }}>
                <button 
                  onClick={() => { setSelectedJob(null); setApplyJob(selectedJob); }}
                  style={{ 
                    flex: 1, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', 
                    color: 'white', border: 'none', padding: '18px', borderRadius: 16, 
                    fontWeight: 800, fontSize: 16, cursor: 'pointer', boxShadow: '0 10px 30px rgba(79,70,229,0.2)'
                  }}
                >
                  Apply Now
                </button>
                <button 
                  onClick={() => setSelectedJob(null)}
                  style={{ background: '#F3F4F6', color: '#4B5563', border: 'none', padding: '18px 32px', borderRadius: 16, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Apply Form Modal ── */}
      <AnimatePresence>
        {applyJob && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setApplyJob(null); setSubmitted(false); }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(15, 10, 26, 0.9)', backdropFilter: 'blur(16px)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 40 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'white', width: '100%', maxWidth: 540, borderRadius: 32, overflow: 'hidden' }}
            >
              <div style={{ padding: '32px 40px', borderBottom: '1px solid #F3F4F6', position: 'relative' }}>
                <h3 style={{ fontWeight: 900, fontSize: 24, margin: 0 }}>Apply Position</h3>
                <p style={{ color: '#6366F1', fontWeight: 700, margin: '4px 0 0' }}>{applyJob.title}</p>
                <button onClick={() => { setApplyJob(null); setSubmitted(false); }} style={{ position: 'absolute', top: 32, right: 32, background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
                  <X size={24} />
                </button>
              </div>

              <div style={{ padding: 40 }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 80, height: 80, borderRadius: '50%', background: '#10B981', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <CheckCircle2 size={40} />
                    </motion.div>
                    <h3 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Application Success!</h3>
                    <p style={{ color: '#6B7280' }}>Our team will review your profile and contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="input-group">
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Name</label>
                        <input required placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
                      </div>
                      <div className="input-group">
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Email</label>
                        <input required type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div className="input-group">
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Phone</label>
                        <input required placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} />
                      </div>
                      <div className="input-group">
                        <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Experience</label>
                        <input required placeholder="3+ Years" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} style={inputStyle} />
                      </div>
                    </div>
                    <div className="input-group">
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>Tell us about your greatest project</label>
                      <textarea required rows={4} placeholder="I built a scalable..." value={form.coverLetter} onChange={e => setForm({...form, coverLetter: e.target.value})} style={{ ...inputStyle, resize: 'none' }} />
                    </div>
                    <button type="submit" style={{ 
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', 
                      color: 'white', border: 'none', padding: '16px', borderRadius: 16, 
                      fontWeight: 800, fontSize: 16, cursor: 'pointer', marginTop: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                    }}>
                      SUBMIT APPLICATION <Send size={18} />
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 14,
  border: '1.5px solid #E5E7EB',
  fontSize: 14,
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box' as const
};
