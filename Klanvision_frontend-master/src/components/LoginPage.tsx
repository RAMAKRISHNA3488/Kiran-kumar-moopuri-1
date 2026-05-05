import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, User, Headphones, Briefcase, Shield, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

const roles = [
  { id: 'candidate', label: 'Candidate', desc: 'Apply for jobs & track applications', icon: User, color: '#8B5CF6', gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)' },
  { id: 'customer', label: 'Customer Care', desc: 'Manage support tickets & clients', icon: Headphones, color: '#06B6D4', gradient: 'linear-gradient(135deg, #0891B2, #22D3EE)' },
  { id: 'employee', label: 'Employee', desc: 'Access internal portal & resources', icon: Briefcase, color: '#10B981', gradient: 'linear-gradient(135deg, #059669, #34D399)' },
  { id: 'admin', label: 'Admin', desc: 'Full system administration access', icon: Shield, color: '#EF4444', gradient: 'linear-gradient(135deg, #DC2626, #F87171)' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: selectedRole.id }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('kv_token', data.token);
        localStorage.setItem('kv_role', selectedRole.id);
        localStorage.setItem('kv_user', JSON.stringify(data.user));
        window.location.href = `/dashboard/${selectedRole.id}`;
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch {
      setError('Server is unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0F0A1A 0%, #1E1B4B 50%, #312E81 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative', overflow: 'hidden' }}>
      {/* Background decorations */}
      <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -150, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.1), transparent)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 2 }}>
        {/* Back link */}
        <a href="/" style={{ color: '#A855F7', display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', fontSize: 14, fontWeight: 700, marginBottom: 32, letterSpacing: '1px', justifyContent: 'center' }}>
          <ChevronLeft size={16} /> BACK TO HOME
        </a>

        {/* Login Card */}
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: 28, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', padding: '40px 32px 24px' }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Lock size={28} color="white" />
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, marginBottom: 8, fontFamily: "'Poppins',sans-serif" }}>
              Sign in to <span className="gradient-text">Klanvision</span>
            </h1>
            <p style={{ color: '#9CA3AF', fontSize: 14 }}>Select your role and enter credentials</p>
          </div>

          <div style={{ padding: '0 32px 36px' }}>
            {/* Role Selection Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {roles.map(role => (
                <motion.button key={role.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => { setSelectedRole(role); setError(''); }}
                  style={{
                    padding: '16px 12px', borderRadius: 16, border: selectedRole?.id === role.id ? `2px solid ${role.color}` : '2px solid rgba(255,255,255,0.08)',
                    background: selectedRole?.id === role.id ? `${role.color}15` : 'rgba(255,255,255,0.03)',
                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: selectedRole?.id === role.id ? role.gradient : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px',
                    color: selectedRole?.id === role.id ? 'white' : '#9CA3AF' }}>
                    <role.icon size={20} />
                  </div>
                  <div style={{ color: selectedRole?.id === role.id ? 'white' : '#9CA3AF', fontSize: 13, fontWeight: 700 }}>{role.label}</div>
                  <div style={{ color: '#6B7280', fontSize: 10, marginTop: 4 }}>{role.desc}</div>
                </motion.button>
              ))}
            </div>

            {/* Login Form */}
            <AnimatePresence mode="wait">
              {selectedRole && (
                <motion.form key={selectedRole.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Email */}
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                    <input type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
                      style={{ width: '100%', padding: '14px 16px 14px 44px', borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                  </div>
                  {/* Password */}
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }} />
                    <input type={showPassword ? 'text' : 'password'} required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                      style={{ width: '100%', padding: '14px 44px 14px 44px', borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'white', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer' }}>
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {error && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '10px 14px', color: '#F87171', fontSize: 13 }}>{error}</div>}

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={loading}
                    style={{ padding: '14px 24px', borderRadius: 14, border: 'none', background: selectedRole.gradient, color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: loading ? 0.7 : 1, fontFamily: "'Poppins',sans-serif" }}>
                    {loading ? 'Signing in...' : `Sign in as ${selectedRole.label}`} {!loading && <ArrowRight size={18} />}
                  </motion.button>

                  <div style={{ textAlign: 'center' }}>
                    <a href="#" style={{ color: '#A855F7', fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {!selectedRole && (
              <div style={{ textAlign: 'center', padding: '20px 0', color: '#6B7280', fontSize: 14 }}>
                ↑ Select a role above to continue
              </div>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#6B7280', fontSize: 12, marginTop: 24 }}>
          © 2025 Klanvision. Secured with enterprise-grade encryption.
        </p>
      </motion.div>
    </div>
  );
}
