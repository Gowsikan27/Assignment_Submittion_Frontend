"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0;
            transform: translateY(30px);
          }
          100% { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          0% { 
            opacity: 0;
            transform: translateX(-30px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          0% { 
            opacity: 0;
            transform: translateX(30px);
          }
          100% { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 20px rgba(168, 85, 247, 0.5)); }
          50% { filter: brightness(1.1) drop-shadow(0 0 30px rgba(168, 85, 247, 0.8)); }
        }
        
        .animate-gradient {
          background: linear-gradient(-45deg, #8B5CF6, #EC4899, #F472B6, #A855F7);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-stagger-1 { animation-delay: 0.2s; }
        .animate-stagger-2 { animation-delay: 0.4s; }
        .animate-stagger-3 { animation-delay: 0.6s; }
        .animate-stagger-4 { animation-delay: 0.8s; }
      `}</style>

      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 animate-gradient"></div>
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Premium Blue Floating Glass Shapes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float shadow-2xl shadow-blue-500/30"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-float animate-stagger-1 shadow-2xl shadow-cyan-500/30"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-float animate-stagger-2 shadow-2xl shadow-indigo-500/30"></div>
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl animate-float animate-stagger-3 shadow-2xl shadow-sky-500/30"></div>
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl animate-float animate-stagger-1 shadow-2xl shadow-blue-600/20"></div>
          <div className="absolute top-1/3 right-1/3 w-56 h-56 bg-cyan-600/15 rounded-full blur-3xl animate-float animate-stagger-2 shadow-2xl shadow-cyan-600/20"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left animate-slideInLeft">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 mb-6">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Productivity Reimagined</span>
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  TaskFlow
                  <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-white/80 mt-2">
                    Streamline Your Workflow
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                  Transform your productivity with our intelligent task management platform. Create, organize, and track assignments with unprecedented ease.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/assignments"
                    className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-lg animate-glow"
                  >
                    <span className="flex items-center gap-2">
                      Get Started
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </Link>
                  
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg"
                  >
                    <span className="flex items-center gap-2">
                      View Dashboard
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">10K+</div>
                    <div className="text-white/60 text-sm">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">50K+</div>
                    <div className="text-white/60 text-sm">Tasks Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">99.9%</div>
                    <div className="text-white/60 text-sm">Uptime</div>
                  </div>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="relative animate-slideInRight">
                {/* Main Illustration */}
                <div className="relative z-10">
                  <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Circle */}
                    <circle cx="200" cy="150" r="120" fill="url(#gradient1)" opacity="0.1"/>
                    
                    {/* Task Cards */}
                    <rect x="50" y="80" width="120" height="80" rx="8" fill="white" opacity="0.9"/>
                    <rect x="230" y="60" width="120" height="80" rx="8" fill="white" opacity="0.9"/>
                    <rect x="140" y="160" width="120" height="80" rx="8" fill="white" opacity="0.9"/>
                    
                    {/* Task Lines */}
                    <line x1="170" y1="120" x2="230" y2="100" stroke="#8B5CF6" strokeWidth="2"/>
                    <line x1="290" y1="100" x2="260" y2="200" stroke="#EC4899" strokeWidth="2"/>
                    <line x1="140" y1="200" x2="170" y2="120" stroke="#A855F7" strokeWidth="2"/>
                    
                    {/* Checkmarks */}
                    <circle cx="80" cy="110" r="8" fill="#10B981"/>
                    <path d="M76 110L79 113L84 108" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    
                    <circle cx="260" cy="90" r="8" fill="#10B981"/>
                    <path d="M256 90L259 93L264 88" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    
                    <circle cx="170" cy="190" r="8" fill="#F59E0B"/>
                    <circle cx="170" cy="190" r="6" fill="white" opacity="0.3"/>
                    
                    {/* Floating Elements */}
                    <circle cx="320" cy="40" r="4" fill="#8B5CF6" opacity="0.6"/>
                    <circle cx="80" cy="250" r="4" fill="#EC4899" opacity="0.6"/>
                    <circle cx="350" cy="200" r="3" fill="#A855F7" opacity="0.6"/>
                    
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6"/>
                        <stop offset="100%" stopColor="#EC4899"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-10 right-10 w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center animate-float">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <div className="absolute bottom-10 left-10 w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center justify-center animate-float animate-stagger-1">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative z-10 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fadeInUp">
              <h2 className="text-4xl font-bold text-white mb-4">
                Powerful Features for Modern Teams
              </h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Everything you need to manage tasks efficiently and boost productivity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:bg-white/15 animate-fadeInUp animate-stagger-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Easy Creation</h3>
                <p className="text-white/70 leading-relaxed">
                  Create tasks and assignments with our intuitive interface. Add details, files, and deadlines in seconds.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:bg-white/15 animate-fadeInUp animate-stagger-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Smart Tracking</h3>
                <p className="text-white/70 leading-relaxed">
                  Monitor progress in real-time with visual dashboards and detailed analytics.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:bg-white/15 animate-fadeInUp animate-stagger-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">File Management</h3>
                <p className="text-white/70 leading-relaxed">
                  Attach files, documents, and resources. Support for multiple formats with drag-and-drop.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:bg-white/15 animate-fadeInUp animate-stagger-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Advanced Search</h3>
                <p className="text-white/70 leading-relaxed">
                  Find any task instantly with powerful search and filtering capabilities.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:bg-white/15 animate-fadeInUp animate-stagger-1">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Status Management</h3>
                <p className="text-white/70 leading-relaxed">
                  Track task status from creation to completion with customizable workflows.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 hover:scale-105 transition-all duration-300 hover:bg-white/15 animate-fadeInUp animate-stagger-2">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
                <p className="text-white/70 leading-relaxed">
                  Optimized performance for seamless experience even with large datasets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}