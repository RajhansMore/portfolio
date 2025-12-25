/**
 * CONTACT MODAL
 * Interactive contact form modal with split layout
 */

'use client';

import React, { useState } from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn } from '@/components/UI/Animations';
import { motion } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
        setErrors({});
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8 overflow-y-auto custom-scrollbar">
      <FadeIn className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-all hover:rotate-90 z-20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
          {/* Left Column: Brand & Info */}
          <div className="lg:col-span-2 p-8 md:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4">Let's Connect</h2>
                <p className="text-blue-100/80 leading-relaxed font-medium">
                  Have a vision for a groundbreaking product? Or just want to discuss the latest in AI? I'm all ears.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/60 font-black">Email</p>
                    <a href={`mailto:${portfolioConfig.personal.email}`} className="font-bold truncate hover:text-blue-200 transition-colors">
                      {portfolioConfig.personal.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-blue-200/60 font-black">Phone</p>
                    <p className="font-bold">{portfolioConfig.personal.phone}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-sm font-medium italic opacity-80">
                  "The best way to predict the future is to build it."
                </p>
              </div>
            </div>

            {/* Decorative background shapes */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-10 right-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse pointer-events-none" />
          </div>

          {/* Right Column: Form or Success */}
          <div className="lg:col-span-3 p-8 md:p-12 bg-slate-900 flex flex-col justify-center">
            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/50">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Message Transmitted!</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                  Thank you, I'll get back to you soon
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                >
                  Close Laboratory
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      className={`w-full px-4 py-3 bg-slate-950 border ${errors.firstName ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 focus:border-blue-500'} rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all`}
                    />
                    {errors.firstName && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Doe"
                      className={`w-full px-4 py-3 bg-slate-950 border ${errors.lastName ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 focus:border-blue-500'} rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all`}
                    />
                    {errors.lastName && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 bg-slate-950 border ${errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 focus:border-blue-500'} rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all`}
                  />
                  {errors.email && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 font-black ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project or query..."
                    rows={4}
                    className={`w-full px-4 py-3 bg-slate-950 border ${errors.message ? 'border-red-500/50 bg-red-500/5' : 'border-slate-800 focus:border-blue-500'} rounded-xl text-white placeholder-gray-700 focus:outline-none transition-all resize-none`}
                  />
                  {errors.message && <p className="text-red-400 text-[10px] font-bold mt-1 ml-1 uppercase">{errors.message}</p>}
                </div>

                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold text-center">
                    Oops! Protocol failed. Please re-check your data.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ContactModal;
