import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAcademic } from '../context/AcademicContext';
// FIXED: Added Sun and Moon to this import list
import { GraduationCap, Mail, Lock, User, ArrowRight, Github, Linkedin, Sun, Moon } from 'lucide-react';

export const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  // FIXED: Added darkMode and toggleDarkMode here
  const { user, switchRole, showNotification, darkMode, toggleDarkMode, login } = useAcademic();

  const handleLogin = (e) => {
    e.preventDefault();
    // Use the real login function
    login("alex.rivera@college.edu", "faculty"); 
    navigate('/');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    showNotification("Account created! Please sign in.");
    setIsSignUp(false); 
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-200">
      
      {/* Dark Mode Toggle (Floating Top Right) */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-yellow-400 shadow-lg hover:scale-110 transition-transform"
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
      
      {/* Main Card Container */}
      <div className={`relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl min-h-[500px] flex transition-all duration-200`}>
        
        {/* --- SIGN UP FORM (Hidden by default) --- */}
        <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 left-0 z-10 ${isSignUp ? 'opacity-100 translate-x-full' : 'opacity-0 z-0'}`}>
          <form onSubmit={handleSignUp} className="bg-white dark:bg-slate-800 h-full flex flex-col items-center justify-center p-10 text-center">
            <h1 className="font-bold text-3xl mb-4 text-slate-800 dark:text-white">Create Account</h1>
            
            <div className="flex gap-4 mb-4">
              <button type="button" className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Github size={20} className="text-slate-600 dark:text-slate-300"/>
              </button>
              <button type="button" className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Linkedin size={20} className="text-blue-600"/>
              </button>
            </div>

            <span className="text-xs text-slate-400 mb-4">or use your email for registration</span>

            <div className="w-full space-y-3">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 py-3">
                <User size={18} className="text-slate-400" />
                <input type="text" placeholder="Name" className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white placeholder:text-slate-400" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 py-3">
                <Mail size={18} className="text-slate-400" />
                <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white placeholder:text-slate-400" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 py-3">
                <Lock size={18} className="text-slate-400" />
                <input type="password" placeholder="Password" className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white placeholder:text-slate-400" />
              </div>
            </div>

            <button className="mt-6 bg-primary-600 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-primary-700 transition-transform active:scale-95 shadow-lg shadow-primary-500/30">
              Sign Up
            </button>
          </form>
        </div>

        {/* --- SIGN IN FORM (Visible by default) --- */}
        <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out w-1/2 left-0 z-20 ${isSignUp ? '-translate-x-full opacity-0' : 'opacity-100'}`}>
          <form onSubmit={handleLogin} className="bg-white dark:bg-slate-800 h-full flex flex-col items-center justify-center p-10 text-center">
            <h1 className="font-bold text-3xl mb-6 text-slate-800 dark:text-white">Sign In</h1>
            
            <div className="flex gap-4 mb-6">
              <button type="button" className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Github size={20} className="text-slate-600 dark:text-slate-300"/>
              </button>
              <button type="button" className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <Linkedin size={20} className="text-blue-600"/>
              </button>
            </div>

            <span className="text-xs text-slate-400 mb-4">or use your email account</span>

            <div className="w-full space-y-3">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 py-3">
                <Mail size={18} className="text-slate-400" />
                <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white placeholder:text-slate-400" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center px-4 py-3">
                <Lock size={18} className="text-slate-400" />
                <input type="password" placeholder="Password" className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-700 dark:text-white placeholder:text-slate-400" />
              </div>
            </div>

            <a href="#" className="text-xs text-slate-500 dark:text-slate-400 mt-4 hover:text-primary-600 hover:underline">Forgot your password?</a>

            <button className="mt-6 bg-primary-600 text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-primary-700 transition-transform active:scale-95 shadow-lg shadow-primary-500/30">
              Sign In
            </button>
          </form>
        </div>

        {/* --- THE SLIDING OVERLAY --- */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-50 ${isSignUp ? '-translate-x-full' : ''}`}>
          <div className={`bg-gradient-to-br from-primary-600 to-primary-800 dark:from-slate-900 dark:to-slate-800 text-white relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out flex items-center justify-center ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}`}>
            
            {/* Overlay Left (Shown when in Sign Up Mode) */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center px-10 text-center transform transition-transform duration-700 ease-in-out">
              <div className="mb-4 bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <GraduationCap size={48} className="text-white" />
              </div>
              <h1 className="font-bold text-3xl mb-2">Welcome Back!</h1>
              <p className="text-sm font-light mb-8 opacity-90">
                To keep connected with your academic progress please login with your personal info
              </p>
              <button 
                onClick={() => setIsSignUp(false)}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-primary-700 transition-all"
              >
                Sign In
              </button>
            </div>

            {/* Overlay Right (Shown when in Sign In Mode) */}
            <div className="w-1/2 h-full flex flex-col items-center justify-center px-10 text-center transform transition-transform duration-700 ease-in-out">
              <h1 className="font-bold text-3xl mb-2">AcadNexus</h1>
              <p className="text-sm font-light mb-8 opacity-90">
                Enter your personal details and start your journey with our integrated workflow system
              </p>
              <button 
                onClick={() => setIsSignUp(true)}
                className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-primary-700 transition-all flex items-center gap-2"
              >
                Sign Up <ArrowRight size={16} />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};