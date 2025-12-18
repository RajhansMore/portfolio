/**
 * CONTACT MODAL
 * Interactive contact form modal with split layout
 */

'use client';

import React, { useState } from 'react';
import { portfolioConfig } from '@/config/portfolio.config';
import { FadeIn } from '@/components/UI/Animations';

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

    // Phone validation (10 digits, numeric only)
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
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
      // Combine names for API
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
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 md:p-8 overflow-y-auto">
      <FadeIn className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        {/* Left Column: Info & Text */}
        <div className="space-y-8 pt-8">
          <div>
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Contact Us</h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-6">
              Want to work together? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
                Let's make something great
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {portfolioConfig.personal?.email && (
              <a
                href={`mailto:${portfolioConfig.personal?.email}`}
                className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-blue-400 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium">{portfolioConfig.personal?.email}</span>
              </a>
            )}

            {portfolioConfig.personal?.phone && (
              <a
                href={`tel:${portfolioConfig.personal?.phone}`}
                className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-green-500 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center text-green-400 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-300 group-hover:text-white font-medium">{portfolioConfig.personal?.phone}</span>
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Need Help?</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Whether it's a query, feedback, or a cool idea — I'm just a message away.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Collaboration Section</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Have an exciting project in mind? I'd love to team up and bring ideas to life. Let's build something amazing together!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Get in Touch</h3>
            <p className="text-gray-400">You can reach us anytime</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your First Name"
                  className={`w-full px-4 py-3 bg-slate-950/50 border ${errors.firstName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your Last Name"
                  className={`w-full px-4 py-3 bg-slate-950/50 border ${errors.lastName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Address"
              className={`w-full px-4 py-3 bg-slate-950/50 border ${errors.email ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Contact Number (10 digits)"
              className={`w-full px-4 py-3 bg-slate-950/50 border ${errors.phone ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}

            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="How can I help you? (or &quot;Subject&quot;)"
              className={`w-full px-4 py-3 bg-slate-950/50 border ${errors.subject ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors`}
            />
            {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Let's talk! Share your message here."
              rows={4}
              className={`w-full px-4 py-3 bg-slate-950/50 border ${errors.message ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none`}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-3 bg-green-500/20 border border-green-500 rounded text-green-400 text-sm">
                ✓ Message sent successfully!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-3 bg-red-500/20 border border-red-500 rounded text-red-400 text-sm">
                ✗ Failed to send message. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
};

export default ContactModal;
