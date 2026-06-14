'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Mail, Lock, User, CheckCircle2, Shield } from 'lucide-react';
import siteContent from '@/data/siteContent.json';

// Nested Component that uses useSearchParams
function AuthFormContainer() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('register');
  
  // Form Inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Read URL params to set initial active tab
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'login') {
      setActiveTab('signin');
    } else {
      setActiveTab('register');
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setValidationError('');
  };

  const handleTabChange = (tab: 'signin' | 'register') => {
    setActiveTab(tab);
    setValidationError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    });
  };

  const validate = () => {
    if (!formData.email.trim()) return 'Email address is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.password) return 'Password is required.';
    if (formData.password.length < 6) return 'Password must be at least 6 characters.';

    if (activeTab === 'register') {
      if (!formData.name.trim()) return 'Full name is required.';
      if (formData.password !== formData.confirmPassword) return 'Passwords do not match.';
      if (!formData.agreeToTerms) return 'You must agree to the Terms of Service.';
    }
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setValidationError(errorMsg);
      return;
    }

    setIsSubmitting(true);
    // Simulate auth API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="card text-center p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-primary-950/20 max-w-md w-full bg-white animate-fade-in space-y-6">
        <div className="w-20 h-20 rounded-full bg-accent-100 text-accent-500 flex items-center justify-center mx-auto shadow-glow-accent">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTab === 'register' ? 'Account Created!' : 'Welcome Back!'}
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            {activeTab === 'register' 
              ? 'Your AuraShip mailbox has been successfully provisioned. You are ready to start shipping!' 
              : 'Successfully signed in. Preparing your courier tracking dashboard...'}
          </p>
        </div>
        
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 text-left text-xs text-slate-600 space-y-1.5 border border-slate-100">
            <p className="font-bold text-slate-800 uppercase tracking-wide">Demo Credentials</p>
            <p><strong>Mailbox ID:</strong> SJC-74291-MIA</p>
            <p><strong>Status:</strong> Active (Ready for shipments)</p>
          </div>
          <a
            href="/"
            className="btn-primary w-full py-3.5 rounded-xl block text-center"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-2xl border border-slate-100 max-w-md w-full bg-white overflow-hidden p-0">
      
      {/* Tab Switcher Headers */}
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        <button
          type="button"
          onClick={() => handleTabChange('register')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'register'
              ? 'border-primary-600 text-primary-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('signin')}
          className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'signin'
              ? 'border-primary-600 text-primary-600 bg-white'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Sign In
        </button>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
            {activeTab === 'register' ? 'Register Box' : 'Access Mailbox'}
          </h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            {activeTab === 'register' 
              ? 'Get your dedicated Florida shipping address in minutes.' 
              : 'Log in to track your current cargo packages.'}
          </p>
        </div>

        {/* Validation Errors */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            <p>{validationError}</p>
          </div>
        )}

        <div className="space-y-4">
          
          {/* Full Name (Register Only) */}
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="auth-name" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="text"
                  id="auth-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="input-field pl-11 py-2.5 text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="auth-email" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="email"
                id="auth-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="input-field pl-11 py-2.5 text-sm"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <label htmlFor="auth-password" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Password
              </label>
              {activeTab === 'signin' && (
                <button
                  type="button"
                  onClick={() => alert('Demo Reset: A password reset link has been dispatched in sandbox mode.')}
                  className="text-[10px] font-bold text-primary-500 hover:underline"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="password"
                id="auth-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••"
                className="input-field pl-11 py-2.5 text-sm"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Confirm Password (Register Only) */}
          {activeTab === 'register' && (
            <div className="space-y-1.5">
              <label htmlFor="auth-confirm-password" className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                <input
                  type="password"
                  id="auth-confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••"
                  className="input-field pl-11 py-2.5 text-sm"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          )}

          {/* Terms checkbox (Register Only) */}
          {activeTab === 'register' && (
            <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 rounded text-primary-600 border-slate-300 mt-0.5 focus:ring-primary-500/20"
                disabled={isSubmitting}
              />
              <span className="text-xs text-slate-500 leading-relaxed">
                I agree to the{' '}
                <button type="button" onClick={() => alert('Demo: Terms of Service Agreement')} className="font-semibold text-primary-600 hover:underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" onClick={() => alert('Demo: Privacy Policy Agreement')} className="font-semibold text-primary-600 hover:underline">
                  Privacy Policy
                </button>.
              </span>
            </label>
          )}

        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm tracking-wide"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Processing...
            </>
          ) : (
            activeTab === 'register' ? 'Create Free Account' : 'Sign In to Dashboard'
          )}
        </button>
        
        {/* Help block */}
        <div className="flex items-center gap-2 justify-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          <Shield className="w-3.5 h-3.5" />
          Secure SSL Encrypted Session
        </div>
      </form>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-between p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e1a6e 0%, #3b34cc 45%, #5b54f5 75%, #7b73fc 100%)' }}
    >
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full blur-3xl"
          style={{ background: 'rgba(123, 115, 252, 0.25)', animation: 'pulseSoft 3s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: 'rgba(26, 181, 103, 0.15)', animation: 'pulseSoft 3s ease-in-out infinite 1.5s' }}
        />
      </div>

      {/* Top bar back button */}
      <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between">
        <a 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </a>
        
        <a href="/" className="flex items-center h-9 group">
          <img src="/aurashiplogo.svg" alt="AuraShip Logo" className="h-full w-auto object-contain transition-transform group-hover:scale-[1.02] duration-200" />
        </a>
      </div>

      {/* Centered Auth Panel */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-12">
        <Suspense fallback={
          <div className="card text-center p-8 max-w-md w-full bg-white">
            <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-400">Initializing secure session...</p>
          </div>
        }>
          <AuthFormContainer />
        </Suspense>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-6xl w-full mx-auto text-center text-[10px] text-white/45">
        &copy; {new Date().getFullYear()} AuraShip Courier. Demo Account Sandbox. All connections log-recorded.
      </div>
    </div>
  );
}
