// ============================================================
// BlogSection.tsx
// Blog articles section for Klanvision.
// Displays 6 article cards in a responsive 3-column grid.
// Each card has a cover icon, tag, date, title, excerpt,
// author, and read-time. A "View All" button sits below.
// ============================================================

import { motion } from 'framer-motion';
import { Search, Smartphone, Cloud, Lock, Palette, BarChart, PenTool, Clock } from 'lucide-react';

// Blog post data – each entry defines icon, tag color, metadata, and content
const posts = [
  {
    icon: Search,
    tag: 'SEO', tagColor: '#4F46E5',
    title: '10 SEO Strategies That Will Dominate 2025',
    excerpt: 'Discover the most effective SEO techniques to boost your organic rankings and outperform competitors in the modern search landscape.',
    date: 'April 10, 2025', readTime: '5 min read', author: 'Klanvision Team',
  },
  {
    icon: Smartphone,
    tag: 'Mobile Dev', tagColor: '#8B5CF6',
    title: 'Why Flutter is the Future of Cross-Platform App Development',
    excerpt: 'Flutter has emerged as the top choice for building beautiful, natively compiled apps for mobile, web, and desktop from a single codebase.',
    date: 'April 5, 2025', readTime: '7 min read', author: 'Dev Team',
  },
  {
    icon: Cloud,
    tag: 'Cloud', tagColor: '#06B6D4',
    title: 'Migrating to Cloud: A Step-by-Step Guide for SMBs',
    excerpt: 'Cloud migration doesn\'t have to be overwhelming. Here\'s a practical, phased approach for small and medium businesses making the move.',
    date: 'March 28, 2025', readTime: '8 min read', author: 'Cloud Experts',
  },
  {
    icon: Lock,
    tag: 'Security', tagColor: '#EF4444',
    title: 'Cybersecurity Threats to Watch in 2025',
    excerpt: 'From AI-powered phishing to sophisticated ransomware, here are the key threats every business needs to prepare for this year.',
    date: 'March 20, 2025', readTime: '6 min read', author: 'Security Team',
  },
  {
    icon: Palette,
    tag: 'Design', tagColor: '#EC4899',
    title: 'UI/UX Trends Shaping Digital Products in 2025',
    excerpt: 'Glassmorphism, micro-animations, and AI-personalized Poppinsfaces — the design trends redefining how users Poppinsact with digital products.',
    date: 'March 15, 2025', readTime: '4 min read', author: 'Design Team',
  },
  {
    icon: BarChart,
    tag: 'Marketing', tagColor: '#F97316',
    title: 'How to Build a Data-Driven Marketing Strategy',
    excerpt: 'Numbers tell stories. Learn how to leverage analytics, customer data, and performance metrics to craft campaigns that actually convert.',
    date: 'March 8, 2025', readTime: '6 min read', author: 'Marketing Team',
  },
];

export default function BlogSection() {
  return (
    // Section – light gray background
    <section id="blog" style={{ background: '#F5F6FA', padding: '80px 0' }}>
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
            Latest from Our <span className="gradient-text">Blog</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 17, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            Insights, tutorials, and industry news from the Klanvision team — stay ahead of the digital curve.
          </p>
        </motion.div>

        {/* Blog Cards Grid – 1 col mobile, 2 cols sm, 3 cols lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            // Each card slides up and fades in with a staggered delay
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -7 }}         // lift on hover
              className="card"
              style={{ overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Cover area – tinted gradient background with large category icon */}
              <div style={{
                height: 160, background: `linear-gradient(135deg, ${post.tagColor}12, ${post.tagColor}25)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 56, position: 'relative', color: post.tagColor,
              }}>
                <span><post.icon size={56} /></span>
                {/* Thin top color accent line matching tag color */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: post.tagColor }} />
              </div>

              <div style={{ padding: '24px' }}>
                {/* Tag pill + publication date row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span className="blog-tag" style={{ background: `${post.tagColor}15`, color: post.tagColor }}>
                    {post.tag}
                  </span>
                  <span style={{ color: '#9CA3AF', fontSize: 12 }}>{post.date}</span>
                </div>

                {/* Article title and excerpt */}
                <h3 style={{ fontFamily: 'sans-serif', fontWeight: 700, fontSize: 17, marginBottom: 10, lineHeight: 1.3 }}>{post.title}</h3>
                <p style={{ color: '#6B7280', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>{post.excerpt}</p>

                {/* Footer row – author and read time */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid #F3F4F6' }}>
                  <span style={{ color: '#9CA3AF', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><PenTool size={12} /> {post.author}</span>
                  <span style={{ color: '#9CA3AF', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* "View All Articles" CTA – centered below the grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 44 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            id="blog-load-more"
            className="btn-outline"
          >
            View All Articles
          </motion.button>
        </motion.div>
      </div>

    </section>
  );
}
