import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { 
  CheckCircle2, ArrowRight, Shield, Clock, Zap,
  LayoutDashboard, Calendar, FileText
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center transform rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-6 h-6 -rotate-3">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-none">AcadNexus</h1>
              <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest leading-none">Academic Workflow & Well-being</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'For Students', 'For Faculty', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden sm:inline-flex text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link 
              to="/login"
              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-bold rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden relative">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-6 mb-12 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Simplify Your Academic
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                  <TypeAnimation
                    sequence={[
                      'Requests.', 2000,
                      'Approvals.', 2000,
                      'Scheduling.', 2000,
                      'Well-being.', 2000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                AcadNexus is the all-in-one platform for managing academic workflow, tracking faculty approvals, and fostering a healthier, lower-stress campus environment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link 
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                >
                  Start Your Journey
                </Link>
                <a href="#features" className="inline-flex items-center font-bold text-primary-600 hover:text-primary-700 transition-colors">
                  Explore Features <ArrowRight size={20} className="ml-2" />
                </a>
              </div>

              {/* Trust Signals */}
              <div className="mt-16 pt-8 border-t border-slate-200/60">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Trusted by Forward-Thinking Institutions</p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-8 grayscale opacity-60">
                  {/* Replace with actual logos */}
                  <div className="h-8 w-24 bg-slate-300/50 rounded animate-pulse"></div>
                  <div className="h-8 w-32 bg-slate-300/50 rounded animate-pulse"></div>
                  <div className="h-8 w-28 bg-slate-300/50 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-slate-300/50 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Right Column: Image/Mockup */}
            <div className="lg:col-span-6 relative lg:h-[600px]">
              <div className="relative w-full h-full">
                {/* Main Mockup Image (Placeholder) */}
                <div className="w-full h-auto rounded-3xl shadow-2xl overflow-hidden border-4 border-white bg-white z-10 relative transform md:rotate-2 lg:absolute lg:top-10 lg:right-0 lg:max-w-xl">
                  <img 
                    src="https://placehold.co/800x600/f1f5f9/cbd5e1?text=AcadNexus+Dashboard+Mockup" 
                    alt="AcadNexus Dashboard" 
                    className="w-full"
                  />
                  {/* Floating Success Notification */}
                  <div className="absolute bottom-8 -left-8 bg-white rounded-2xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.2)] p-4 flex items-center gap-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 z-20">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Request Approved!</p>
                      <p className="text-xs text-slate-500">Medical Leave • Just now</p>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-60 -z-10 animate-pulse delay-700"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FEATURES / "WHY" SECTION --- */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Why Choose AcadNexus?</h2>
            <p className="text-lg text-slate-600">
              Empower your institution with a modern, efficient, and stress-aware academic ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature Card 1 */}
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary-100 hover:bg-white hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reduce Administrative Burden</h3>
              <p className="text-slate-600 leading-relaxed">
                Automate request workflows, track approvals in real-time, and save valuable time for both faculty and staff.
              </p>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Feature Card 2 (Highlighted) */}
            <div className="group p-8 rounded-3xl bg-primary-600 text-white shadow-xl shadow-primary-500/20 transform md:-translate-y-4 relative overflow-hidden">
              <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Monitor & Manage Stress</h3>
              <p className="text-primary-100 leading-relaxed">
                Our unique Stress Engine analyzes academic load to help identify and prevent student burnout before it happens.
              </p>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Feature Card 3 */}
            <div className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary-100 hover:bg-white hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 relative overflow-hidden">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LayoutDashboard size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Centralized Academic Hub</h3>
              <p className="text-slate-600 leading-relaxed">
                Bring calendars, requests, approvals, and communications into one unified, easy-to-use platform.
              </p>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-indigo-700 -z-10"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] -z-10"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Ready to Transform Your Campus?</h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Join the institutions that are prioritizing efficiency and student well-being with AcadNexus.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white bg-white text-primary-700 text-base font-bold rounded-full hover:bg-primary-50 transition-colors shadow-lg"
            >
              Get Started for Free
            </Link>
            <a 
              href="mailto:demo@acadnexus.com"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white text-base font-bold rounded-full hover:bg-white/10 transition-colors"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 bg-slate-900 text-slate-400 text-sm text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center transform rotate-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5 -rotate-3"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    </div>
                    <span className="text-xl font-bold text-white">AcadNexus</span>
                </div>
                <p className="mb-4">The academic workflow platform built for the modern campus.</p>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Product</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">Features</a></li>
                    <li><a href="#" className="hover:text-white">Security</a></li>
                    <li><a href="#" className="hover:text-white">Roadmap</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="text-white font-bold mb-4">Legal</h4>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
            <p>© {new Date().getFullYear()} AcadNexus. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};