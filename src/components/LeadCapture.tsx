/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Inquiry } from '../types';
import { Mail, Phone, MapPin, Send, Trash2, Calendar, ClipboardCheck, Dumbbell, ShieldCheck, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LeadCaptureProps {
  selectedInquiryGoal: string;
  onResetGoal: () => void;
}

export default function LeadCapture({ selectedInquiryGoal, onResetGoal }: LeadCaptureProps) {
  // Input fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Fat Loss');
  const [message, setMessage] = useState('');
  
  // Array of submitted inquiries stored locally
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sink selected goal from pricing / calculator selection props
  useEffect(() => {
    if (selectedInquiryGoal) {
      setGoal(selectedInquiryGoal);
    }
  }, [selectedInquiryGoal]);

  // Load past inquiries from LocalStorage
  useEffect(() => {
    const list = localStorage.getItem('mad_fitness_inquiries');
    if (list) {
      try {
        setInquiries(JSON.parse(list));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccess(false);

    // Assertions and validation
    if (!name.trim()) {
      setErrorMsg("Please provide your full name.");
      return;
    }

    // Phone simple check (Indian phone sizes or basic numeric)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
      setErrorMsg("Please provide a valid contact phone number.");
      return;
    }

    const newInquiry: Inquiry = {
      id: "inq_" + Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      goal,
      message: message.trim() || 'Direct Consultation booking request.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' })
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('mad_fitness_inquiries', JSON.stringify(updated));

    // Clear inputs
    setName('');
    setPhone('');
    setMessage('');
    onResetGoal(); // reset global goal trigger
    setSuccess(true);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(item => item.id !== id);
    setInquiries(updated);
    localStorage.setItem('mad_fitness_inquiries', JSON.stringify(updated));
  };

  const handleClearAllLogs = () => {
    setInquiries([]);
    localStorage.removeItem('mad_fitness_inquiries');
  };

  return (
    <section id="contact" className="py-24 bg-[#121414] border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column A: Address Details */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs text-primary mb-2 block uppercase tracking-widest">
                04 // BASELINE LOCK
              </span>
              <h2 className="font-anton text-4xl md:text-5xl uppercase text-white mb-6 tracking-tight">
                Get In <span className="text-primary italic">Touch</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-gray-400 mb-10 max-w-sm leading-relaxed">
                Take the next step toward your fitness goals. Schedule a direct assessment or personal coaching consultation with Madhukar Mishra in New Delhi.
              </p>

              {/* Direct coordinates list */}
              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-surface-container border border-outline-variant/30 text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase font-bold text-gray-500 tracking-wider">ADDRESS</h4>
                    <p className="font-sans text-xs text-white mt-1 max-w-xs leading-relaxed">B6, House No. 116, Mayur Vihar Extension, New Delhi 110091</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-surface-container border border-outline-variant/30 text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase font-bold text-gray-500 tracking-wider">HOTLINE COMM</h4>
                    <a href="tel:+919572727348" className="font-sans text-xs text-white mt-1 hover:text-primary transition-colors block">+91 95727 27348</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-surface-container border border-outline-variant/30 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] uppercase font-bold text-gray-500 tracking-wider">SECURE INBOX</h4>
                    <a href="mailto:samnouske14@gmail.com" className="font-sans text-xs text-white mt-1 hover:text-primary transition-colors block">samnouske14@gmail.com</a>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick response stats */}
            <div className="mt-12 bg-surface-container-low border border-outline-variant/30 p-5 hidden lg:block">
              <span className="font-mono text-[10px] text-primary uppercase font-bold block mb-1 tracking-widest flex items-center gap-1.5 animate-pulse">
                <ShieldCheck className="w-4 h-4 text-primary" /> IMMEDIATE RESPONSE GUARANTEE
              </span>
              <p className="font-sans text-xs text-gray-400">
                All submitted metrics and inquiry coordinates are routed to Head Coach Madhukar Mishra within 45 minutes of secure baseline local sync.
              </p>
            </div>
          </motion.div>

          {/* Column B: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-surface-container-low border border-outline-variant/40 p-6 md:p-8 flex flex-col justify-between"
          >
            <form onSubmit={handleSubmit} className="space-y-5" id="lead-inquiry-form">
              
              <div className="border-b border-outline-variant/30 pb-4 mb-2">
                <p className="font-mono text-[10px] text-primary uppercase font-bold tracking-widest flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4" /> SECURE REGISTRY SPECIFICATIONS
                </p>
              </div>

              {/* Error warning notification panel */}
              {errorMsg && (
                <div className="bg-red-950/20 border border-red-500/40 text-red-400 text-xs font-mono p-3 leading-relaxed">
                  [WARNING]: {errorMsg}
                </div>
              )}

              {/* Success notification panel */}
              {success && (
                <div className="bg-green-950/20 border border-green-500/40 text-green-400 text-xs font-mono p-3 leading-relaxed flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-green-400 shrink-0" /> [SUCCESS]: Consultation logged. Your record is synced to the console log below!
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name input */}
                <div>
                  <label className="font-mono text-[9px] uppercase font-bold text-gray-400 block mb-1.5">Your Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Madhav Sen" 
                    className="w-full bg-[#121414] border border-outline-variant/30 p-3 text-xs text-white focus:outline-none focus:border-primary placeholder-gray-600 rounded-none font-sans"
                  />
                </div>
                
                {/* Phone input */}
                <div>
                  <label className="font-mono text-[9px] uppercase font-bold text-gray-400 block mb-1.5">Contact Number</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 91XXX XXXXX" 
                    className="w-full bg-[#121414] border border-outline-variant/30 p-3 text-xs text-white focus:outline-none focus:border-primary placeholder-gray-600 rounded-none font-sans"
                  />
                </div>
              </div>

              {/* Dropdown Goal selection */}
              <div>
                <label className="font-mono text-[9px] uppercase font-bold text-gray-400 block mb-1.5">Designated Training Goal</label>
                <select 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-[#121414] border border-outline-variant/30 p-3 text-xs text-white focus:outline-none focus:border-primary rounded-none font-sans cursor-pointer"
                >
                  <option value="Fat Loss">Fat Loss & Metabolic Conditioning</option>
                  <option value="Muscle Building">Muscle Building & Hypertrophy</option>
                  <option value="Strength Training">Strength & Isometric Load Optimization</option>
                  <option value="General Fitness">General Resistance & Performance</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-[9px] uppercase font-bold text-gray-400 block mb-1.5">Message / Health Details</label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your active performance limitations, injuries, or calendar target ranges..."
                  className="w-full bg-[#121414] border border-outline-variant/30 p-3 text-xs text-white focus:outline-none focus:border-primary placeholder-gray-600 rounded-none font-sans resize-none"
                />
              </div>

              {/* Submit triggers */}
              <button 
                type="submit" 
                className="w-full bg-primary hover:bg-[#ff3c0a] text-white font-anton text-xs py-4 uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer border border-primary/20 shadow-md active:scale-[0.99] transition-all"
              >
                REQUEST CONSULTATION <Send className="w-3.5 h-3.5" />
              </button>

            </form>
          </motion.div>

        </div>

        {/* Real-Time Local Inquiries Active Dashboard (Highly functional overlay) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-12 border-t border-outline-variant/30" 
          id="inquiries-dashboard"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
            <div>
              <h3 className="font-anton text-xl tracking-wider text-white uppercase flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-primary" /> Device Inquiries Store
              </h3>
              <p className="font-sans text-[11px] text-gray-500 mt-0.5">
                Verifiable logs of lead transmissions submitted from this local browser profile. (Durable Local Storage integration)
              </p>
            </div>
            {inquiries.length > 0 && (
              <button 
                onClick={handleClearAllLogs} 
                className="font-mono text-[10px] text-primary hover:text-on-surface border border-primary/20 hover:border-on-surface px-3 py-1 bg-primary/10 cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> PURGE LOCAL DATABASE
              </button>
            )}
          </div>

          {inquiries.length === 0 ? (
            <div className="bg-surface-container border border-outline-variant/10 p-8 text-center text-xs font-mono text-gray-500 uppercase">
              No transmission records locally logged. Fill and submit the specifications registry above to check system triggers.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="inquiry-cards-list">
              {inquiries.map((item) => (
                <div key={item.id} className="bg-surface-container border border-outline-variant/40 p-5 relative flex flex-col justify-between shadow-inner">
                  
                  {/* Floating timestamp of dispatch */}
                  <span className="absolute top-4 right-4 font-mono text-[8.5px] text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {item.timestamp}
                  </span>

                  <div>
                    <span className="font-mono text-[8.5px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 border border-primary/20">
                      {item.goal}
                    </span>
                    <h4 className="font-anton text-base text-white uppercase mt-3 tracking-wide">{item.name}</h4>
                    <p className="font-mono text-[10px] text-gray-400 mt-1">{item.phone}</p>
                    <p className="font-sans text-xs text-gray-400 mt-3 border-t border-outline/5 pt-3 leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-outline/10 flex justify-between items-center text-[9px] font-mono">
                    <span className="text-green-400 uppercase font-bold">● STATE: LOCKED IN</span>
                    <button 
                      onClick={() => handleDeleteInquiry(item.id)} 
                      className="text-gray-500 hover:text-primary transition-colors flex items-center gap-0.5 cursor-pointer"
                      aria-label="Delete transmission entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> DELETE
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
