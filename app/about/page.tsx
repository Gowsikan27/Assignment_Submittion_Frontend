"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function About() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      title: "Intuitive Task Creation",
      description: "Create tasks and assignments with our streamlined interface. Add details, files, and deadlines in seconds with smart form validation.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Real-time Progress Tracking",
      description: "Monitor task progress with visual indicators, status updates, and comprehensive analytics to keep everyone informed.",
      icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    },
    {
      title: "Advanced File Management",
      description: "Support for multiple file formats with drag-and-drop functionality, cloud storage integration, and version control.",
      icon: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
    },
    {
      title: "Modern Glassmorphism UI",
      description: "Beautiful, responsive design with smooth animations, glassmorphism effects, and professional user experience across all devices.",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    },
    {
      title: "Powerful Search & Filters",
      description: "Find any task instantly with advanced search, smart filtering, and real-time suggestions across all task fields.",
      icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    },
    {
      title: "Comprehensive Analytics",
      description: "Detailed dashboards with completion rates, productivity metrics, and actionable insights to optimize your workflow.",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  const technologies = [
    { name: "Next.js 14", description: "Modern React framework", color: "bg-gray-800" },
    { name: "TypeScript", description: "Type-safe development", color: "bg-blue-600" },
    { name: "Tailwind CSS", description: "Utility-first styling", color: "bg-cyan-500" },
    { name: "Glassmorphism", description: "Modern UI design", color: "bg-purple-600" },
    { name: "React Hooks", description: "State management", color: "bg-blue-400" },
    { name: "Axios", description: "HTTP client library", color: "bg-pink-500" }
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
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
        
        .animate-stagger-1 { animation-delay: 0.1s; }
        .animate-stagger-2 { animation-delay: 0.2s; }
        .animate-stagger-3 { animation-delay: 0.3s; }
        .animate-stagger-4 { animation-delay: 0.4s; }
        .animate-stagger-5 { animation-delay: 0.5s; }
        .animate-stagger-6 { animation-delay: 0.6s; }
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
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen py-8 px-4 pt-24">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="text-center mb-16 animate-fadeInUp">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-8">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                About TaskFlow
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                The intelligent task management platform that transforms productivity. Built for modern teams who demand efficiency, collaboration, and seamless workflow management.
              </p>
            </header>

            {/* What We Do Section */}
            <section className="mb-16">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl p-8 animate-fadeInUp animate-stagger-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What We Do</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-slideInLeft">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">
                      TaskFlow is a revolutionary task management platform that transforms how teams organize, track, and complete their work. We bridge the gap between chaos and clarity with intelligent automation and beautiful design.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mb-8">
                      Built with cutting-edge web technologies, our platform delivers real-time collaboration, advanced analytics, and seamless integrations to make task management not just efficient, but enjoyable.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        href="/assignments"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Get Started
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-xl hover:scale-105 hover:bg-gray-200 transition-all duration-300"
                      >
                        View Dashboard
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="relative animate-slideInRight">
                    {/* Modern SVG Illustration */}
                    <svg className="w-full h-auto" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background Gradient */}
                      <defs>
                        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1"/>
                          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>
                      <rect x="0" y="0" width="400" height="300" fill="url(#bgGradient)" rx="16"/>
                      
                      {/* Central Hub */}
                      <circle cx="200" cy="150" r="40" fill="white" opacity="0.9"/>
                      <circle cx="200" cy="150" r="30" fill="url(#gradient2)"/>
                      
                      {/* Task Nodes */}
                      <circle cx="100" cy="80" r="25" fill="white" opacity="0.9"/>
                      <circle cx="100" cy="80" r="18" fill="#10B981"/>
                      <path d="M95 80L98 83L103 78" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      
                      <circle cx="300" cy="80" r="25" fill="white" opacity="0.9"/>
                      <circle cx="300" cy="80" r="18" fill="#10B981"/>
                      <path d="M295 80L298 83L303 78" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      
                      <circle cx="100" cy="220" r="25" fill="white" opacity="0.9"/>
                      <circle cx="100" cy="220" r="18" fill="#F59E0B"/>
                      <circle cx="100" cy="220" r="12" fill="white" opacity="0.3"/>
                      
                      <circle cx="300" cy="220" r="25" fill="white" opacity="0.9"/>
                      <circle cx="300" cy="220" r="18" fill="#8B5CF6"/>
                      <path d="M295 220L300 225L305 220" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M295 215L300 220L305 215" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      
                      {/* Connection Lines */}
                      <line x1="140" y1="80" x2="170" y2="130" stroke="#8B5CF6" strokeWidth="2" opacity="0.6"/>
                      <line x1="260" y1="80" x2="230" y2="130" stroke="#EC4899" strokeWidth="2" opacity="0.6"/>
                      <line x1="140" y1="220" x2="170" y2="170" stroke="#F59E0B" strokeWidth="2" opacity="0.6"/>
                      <line x1="260" y1="220" x2="230" y2="170" stroke="#8B5CF6" strokeWidth="2" opacity="0.6"/>
                      
                      {/* Floating Elements */}
                      <circle cx="50" cy="50" r="3" fill="#8B5CF6" opacity="0.4"/>
                      <circle cx="350" cy="50" r="3" fill="#EC4899" opacity="0.4"/>
                      <circle cx="50" cy="250" r="3" fill="#F59E0B" opacity="0.4"/>
                      <circle cx="350" cy="250" r="3" fill="#8B5CF6" opacity="0.4"/>
                      
                      {/* Stats Cards */}
                      <rect x="20" y="140" width="60" height="30" rx="6" fill="white" opacity="0.9"/>
                      <text x="50" y="158" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="bold">98%</text>
                      
                      <rect x="320" y="140" width="60" height="30" rx="6" fill="white" opacity="0.9"/>
                      <text x="350" y="158" textAnchor="middle" fill="#EC4899" fontSize="12" fontWeight="bold">24/7</text>
                      
                      <defs>
                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8B5CF6"/>
                          <stop offset="100%" stopColor="#EC4899"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      Live
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white text-center mb-12 animate-fadeInUp">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Technologies Section */}
            <section className="mb-16">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl p-8 animate-fadeInUp animate-stagger-2">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Technologies We Use</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-12 h-12 ${tech.color} rounded-xl flex items-center justify-center`}>
                        <div className="w-6 h-6 bg-white rounded"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{tech.name}</h4>
                        <p className="text-sm text-gray-600">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center animate-fadeInUp animate-stagger-3">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of educators and students who are already using Assignment Hub to streamline their academic workflow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/assignments"
                    className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-white/25 transition-all duration-300"
                  >
                    Start Creating Assignments
                  </Link>
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  >
                    View Dashboard
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
