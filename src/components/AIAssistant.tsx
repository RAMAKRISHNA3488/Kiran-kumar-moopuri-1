// ============================================================
// AIAssistant.tsx
// Floating AI chat widget for the Klanvision website.
// Includes: gradient toggle FAB (bottom-right), animated chat
// window with message history, and a simulated AI response.
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);  // chat window open/closed

  // Message history – starts with a default greeting from the assistant
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your Klanvision AI Assistant. How can I help you today?' }
  ]);

  const [input, setInput] = useState(''); // current user input text

  // handleSend – appends the user message and simulates an AI reply after 1 second
  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response with a 1-second delay
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "That's a great question! At Klanvision, we specialize in scaling digital innovations. Would you like to speak with our human team for more details?"
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button – fixed at bottom-right, rotates 5° on hover */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed', bottom: 30, right: 30,
          width: 60, height: 60, borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(99, 102, 241, 0.4)',
          zIndex: 2000, border: 'none', cursor: 'pointer'
        }}
      >
        <Bot size={32} />
        {/* Rotating dashed ring around the button */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px dashed rgba(255,255,255,0.4)' }}
        />
      </motion.button>

      {/* Chat Window – mounts/unmounts with scale+y animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            style={{
              position: 'fixed', bottom: 100, right: 30, width: 350, maxHeight: 500,
              background: 'white', borderRadius: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column', zIndex: 2001, overflow: 'hidden',
              border: '1px solid #f3f4f6'
            }}
          >
            {/* Chat Header – gradient background with bot name and online status */}
            <div style={{
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              padding: '20px', color: 'white', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Bot size={24} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>AI Assistant</div>
                  {/* Online status indicator */}
                  <div style={{ fontSize: 11, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} /> Online
                  </div>
                </div>
              </div>
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Message List – scrollable, assistant on left / user on right */}
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 300 }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.role === 'assistant' ? 'flex-start' : 'flex-end',
                    background: m.role === 'assistant' ? '#f3f4f6' : 'linear-gradient(135deg, #6366f1, #a855f7)',
                    color: m.role === 'assistant' ? '#1f2937' : 'white',
                    padding: '12px 16px', borderRadius: 18, fontSize: 13,
                    maxWidth: '85%', boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Input Row – text input + send button */}
            <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: 10 }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()} // send on Enter key
                placeholder="Type your message..."
                style={{
                  flex: 1, border: '1.5px solid #E5E7EB', borderRadius: 50,
                  padding: '10px 20px', fontSize: 13, outline: 'none'
                }}
              />
              {/* Send button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#6366f1', color: 'white',
                  border: 'none', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thin scrollbar style for the message list */}
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 10px; }
      `}</style>
    </>
  );
}
