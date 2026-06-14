'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import siteContent from '@/data/siteContent.json';

export default function ContactSection() {
  const { contact } = siteContent;
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!formData.email.trim()) return 'Please enter your email.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.subject.trim()) return 'Please enter a subject.';
    if (!formData.message.trim()) return 'Please enter your message.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <section id="contact" className="w-full py-20 md:py-28 bg-[#f5f5ff] dark:bg-[#0f0d3a] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -bottom-48 -right-48 w-[550px] h-[550px] rounded-full blur-3xl opacity-30"
          style={{ background: 'rgba(91, 84, 245, 0.15)' }}
        />
        <div
          className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'rgba(26, 181, 103, 0.10)' }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label">Connect</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {contact.title || "Get In Touch"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {contact.subtitle || "Have questions about packages, rates, or custom shipping needs? Our support team is here to help."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ── Left Column: Contact Cards ── */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="card shadow-md space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-primary-950/20 pb-3">
                Contact Information
              </h3>
              
              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-300 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-0.5">Address</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{contact.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <a 
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-4 group hover:scale-[1.01] transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-300 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-950/70 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:underline">{contact.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-4 group hover:scale-[1.01] transition-transform"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-300 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-950/70 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email</h4>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm group-hover:underline break-all">{contact.email}</p>
                  </div>
                </a>

                {/* Operating Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/40 text-primary-600 dark:text-primary-300 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-0.5">Business Hours</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="card shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-gradient-to-r from-accent-50/70 to-emerald-50/40 dark:from-accent-950/10 dark:to-emerald-950/5 border-accent-100 dark:border-accent-950/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-glow-accent">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">WhatsApp Support</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Chat directly with a support agent</p>
                </div>
              </div>
              
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 shadow-none"
              >
                Chat Now
              </a>
            </div>

            {/* Social Links Panel */}
            <div className="flex items-center gap-4 justify-center lg:justify-start pl-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Follow us:</span>
              <a 
                href={contact.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-[#141236] border border-slate-100 dark:border-primary-950/20 text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 hover:-translate-y-0.5 transition-all shadow-sm flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 animate-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a 
                href={contact.socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white dark:bg-[#141236] border border-slate-100 dark:border-primary-950/20 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 transition-all shadow-sm flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 animate-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>

          </div>

          {/* ── Right Column: Interactive Form ── */}
          <div className="lg:col-span-7">
            <div className="card shadow-lg p-8 md:p-10">
              
              {submitStatus === 'success' ? (
                <div className="py-12 text-center animate-fade-in space-y-6">
                  <div className="w-20 h-20 rounded-full bg-accent-100 dark:bg-accent-950/30 text-accent-500 dark:text-accent-400 flex items-center justify-center mx-auto shadow-glow-accent">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Sent!</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
                      Thank you for contacting AuraShip. Our customer service team has received your message and will reply within 24 business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-secondary text-xs px-5 py-2.5 rounded-xl border-slate-200 text-slate-700 dark:text-slate-300 dark:border-primary-900/60"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-primary-950/20 pb-3">
                    Send Us a Message
                  </h3>

                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 flex items-start gap-3 text-sm animate-fade-in">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <p className="font-medium">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="input-field focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="input-field focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="form-subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Question about rates, customs, delivery..."
                      className="input-field focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="form-message" className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your details here..."
                      rows={5}
                      className="input-field focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
