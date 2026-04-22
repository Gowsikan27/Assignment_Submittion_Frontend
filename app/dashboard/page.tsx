"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const BASE_URL = "http://localhost:5000/assignments";

interface Assignment {
  _id: string;
  studentName: string;
  title: string;
  subject: string;
  description: string;
  fileUrl?: string;
  fileName?: string;
  status: "Pending" | "Reviewed";
}

export default function Dashboard() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fetch assignments
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      if (Array.isArray(res.data)) {
        setAssignments(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchAssignments();
  }, []);

  // Calculate stats
  const stats = {
    total: assignments.length,
    pending: assignments.filter(a => a.status === "Pending").length,
    reviewed: assignments.filter(a => a.status === "Reviewed").length,
    completionRate: assignments.length > 0 
      ? Math.round((assignments.filter(a => a.status === "Reviewed").length / assignments.length) * 100)
      : 0
  };

  if (!mounted) return null;

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
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-gradient {
          background: linear-gradient(-45deg, #4F46E5, #9333EA, #FB7185, #F59E0B);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-stagger-1 { animation-delay: 0.1s; }
        .animate-stagger-2 { animation-delay: 0.2s; }
        .animate-stagger-3 { animation-delay: 0.3s; }
        .animate-stagger-4 { animation-delay: 0.4s; }
      `}</style>

      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 animate-gradient"></div>
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Floating Glass Shapes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float animate-stagger-1"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float animate-stagger-2"></div>
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-float animate-stagger-3"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen py-8 px-4 pt-24">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12 animate-fadeInUp">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Dashboard
              </h1>
              <p className="text-xl text-white/80">Overview of your assignment management system</p>
            </header>

            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
                <p className="mt-4 text-white/80">Loading dashboard...</p>
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 hover:scale-105 transition-all duration-300 animate-slideInLeft animate-stagger-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 animate-pulse-slow">
                        {stats.total}
                      </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Total Assignments</h3>
                    <p className="text-gray-600 text-xs mt-1">All assignments in system</p>
                  </div>

                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 hover:scale-105 transition-all duration-300 animate-slideInLeft animate-stagger-2">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-3xl font-bold text-yellow-600 animate-pulse-slow">
                        {stats.pending}
                      </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Pending</h3>
                    <p className="text-gray-600 text-xs mt-1">Awaiting review</p>
                  </div>

                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 hover:scale-105 transition-all duration-300 animate-slideInLeft animate-stagger-3">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-3xl font-bold text-green-600 animate-pulse-slow">
                        {stats.reviewed}
                      </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Reviewed</h3>
                    <p className="text-gray-600 text-xs mt-1">Completed assignments</p>
                  </div>

                  <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 hover:scale-105 transition-all duration-300 animate-slideInLeft animate-stagger-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 animate-pulse-slow">
                        {stats.completionRate}%
                      </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">Completion Rate</h3>
                    <p className="text-gray-600 text-xs mt-1">Reviewed percentage</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-8 mb-8 animate-fadeInUp animate-stagger-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Quick Actions
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                      href="/assignments"
                      className="group bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Create Assignment</h3>
                          <p className="text-blue-100 text-sm">Add a new assignment to the system</p>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/assignments"
                      className="group bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">View All Assignments</h3>
                          <p className="text-green-100 text-sm">Browse and manage existing assignments</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-8 animate-fadeInUp animate-stagger-3">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Recent Activity
                  </h2>

                  {assignments.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p className="text-gray-500">No assignments yet</p>
                      <p className="text-gray-400 text-sm mt-2">Create your first assignment to see activity</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {assignments.slice(0, 5).map((assignment, index) => (
                        <div
                          key={assignment._id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${
                              assignment.status === "Reviewed" ? "bg-green-500" : "bg-yellow-500"
                            }`}></div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                              <p className="text-sm text-gray-600">{assignment.studentName} - {assignment.subject}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            assignment.status === "Reviewed" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {assignment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
