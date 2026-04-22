"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/assignments";

interface Assignment {
  _id: string;
  studentName: string;
  title: string;
  subject: string;
  description: string;
  fileUrl: string;
  status: "Pending" | "Reviewed";
}

interface FormData {
  studentName: string;
  title: string;
  subject: string;
  description: string;
  file: File | null;
}

export default function Home() {
  const [form, setForm] = useState<FormData>({
    studentName: "",
    title: "",
    subject: "",
    description: "",
    file: null
  });

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Show alert with auto-dismiss
  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // File handling functions
  const handleFileChange = (file: File | null) => {
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        setForm({ ...form, file });
      } else {
        showAlert('Please upload a valid file (PDF, DOC, DOCX, PNG, JPG)', 'error');
      }
    } else {
      setForm({ ...form, file: null });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setForm({ ...form, file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Fetch assignments
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);
      setAssignments(res.data);
    } catch (error) {
      showAlert("Failed to fetch assignments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchAssignments();
  }, []);

  // Reset form
  const resetForm = () => {
    setForm({
      studentName: "",
      title: "",
      subject: "",
      description: "",
      file: null
    });
    setIsEditing(false);
    setEditingId(null);
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async () => {
    if (!form.studentName || !form.title || !form.subject) {
      showAlert("Please fill in all required fields", "error");
      return;
    }

    try {
      setSubmitting(true);
      
      const formData = new FormData();
      formData.append('studentName', form.studentName);
      formData.append('title', form.title);
      formData.append('subject', form.subject);
      formData.append('description', form.description);
      if (form.file) {
        formData.append('file', form.file);
      }
      
      if (isEditing && editingId) {
        // Update existing assignment
        await axios.put(`${BASE_URL}/${editingId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showAlert("Assignment updated successfully!", "success");
      } else {
        // Create new assignment
        await axios.post(BASE_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showAlert("Assignment created successfully!", "success");
      }

      resetForm();
      fetchAssignments();
    } catch (error) {
      showAlert(`Failed to ${isEditing ? "update" : "create"} assignment`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit assignment
  const handleEdit = (assignment: Assignment) => {
    setForm({
      studentName: assignment.studentName,
      title: assignment.title,
      subject: assignment.subject,
      description: assignment.description,
      file: null
    });
    setEditingId(assignment._id);
    setIsEditing(true);
  };

  // Mark as reviewed
  const markReviewed = async (id: string) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, { status: "Reviewed" });
      showAlert("Assignment marked as reviewed!", "success");
      fetchAssignments();
    } catch (error) {
      showAlert("Failed to update status", "error");
    }
  };

  // Delete assignment
  const remove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      showAlert("Assignment deleted successfully!", "success");
      fetchAssignments();
    } catch (error) {
      showAlert("Failed to delete assignment", "error");
    }
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.5); }
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
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-stagger-1 { animation-delay: 0.1s; }
        .animate-stagger-2 { animation-delay: 0.2s; }
        .animate-stagger-3 { animation-delay: 0.3s; }
      `}</style>

      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="fixed inset-0 animate-gradient"></div>
        
        {/* Floating Glass Shapes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float animate-stagger-1"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-float animate-stagger-2"></div>
          <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-float animate-stagger-3"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12 animate-fadeInUp">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                Assignment Management
              </h1>
              <p className="text-white/80 text-lg">Organize, track, and manage assignments with ease</p>
            </header>

            {/* Alert Toast */}
            {alert && (
              <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl text-white font-medium shadow-2xl backdrop-blur-xl animate-fadeInUp ${
                alert.type === "success" ? "bg-green-500/80" : "bg-red-500/80"
              }`}>
                <div className="flex items-center gap-3">
                  {alert.type === "success" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {alert.message}
                </div>
              </div>
            )}

            {/* Form Card */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl p-8 mb-8 animate-fadeInUp animate-stagger-1">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  {isEditing ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>
                {isEditing ? "Edit Assignment" : "Create Assignment"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Student Name *"
                    value={form.studentName}
                    onChange={e => setForm({ ...form, studentName: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-base font-medium"
                    disabled={submitting}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Assignment Title *"
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-base font-medium"
                    disabled={submitting}
                  />
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Subject *"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-base font-medium"
                    disabled={submitting}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50/20 border-solid'
                        : 'border-gray-300 bg-gray-50/50 hover:border-gray-400 hover:bg-gray-100/50'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileInput}
                      className="hidden"
                      disabled={submitting}
                    />
                    
                    {form.file ? (
                      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-800 font-semibold text-lg">{form.file.name}</p>
                            <p className="text-gray-500 text-sm">{(form.file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg mb-2">Click or drag file to upload</p>
                        <p className="text-gray-500 text-base mb-6">PDF, DOC, DOCX, PNG, JPG (Max 10MB)</p>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                        >
                          Browse Files
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <textarea
                placeholder="Assignment description (optional)"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="w-full mt-6 px-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 resize-vertical text-base font-medium"
                rows={4}
                disabled={submitting}
              />
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-4 px-8 rounded-xl hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3">
                      {isEditing ? (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Update Assignment
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Create Assignment
                        </>
                      )}
                    </span>
                  )}
                </button>
                
                {isEditing && (
                  <button
                    onClick={resetForm}
                    disabled={submitting}
                    className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg border border-gray-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Assignments List */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 animate-fadeInUp animate-stagger-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  All Assignments
                </h2>
                <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <span className="text-white font-semibold">{assignments.length}</span>
                </div>
              </div>
              
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                  <p className="mt-4 text-white/80">Loading assignments...</p>
                </div>
              ) : assignments.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-lg">No assignments found</p>
                  <p className="text-white/40 mt-2">Create your first assignment to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div
                      key={assignment._id}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10 transition-all duration-300 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {assignment.title}
                          </h3>
                          <div className="flex items-center gap-4 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {assignment.studentName}
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              {assignment.subject}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          assignment.status === "Reviewed" 
                            ? "bg-green-500/20 text-green-300 border border-green-500/30" 
                            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        }`}>
                          {assignment.status}
                        </span>
                      </div>
                      
                      {assignment.description && (
                        <p className="text-white/70 mb-4">{assignment.description}</p>
                      )}
                      
                      {assignment.fileUrl && (
                        <a 
                          href={assignment.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors mb-4"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          View File
                        </a>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEdit(assignment)}
                          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-medium rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </span>
                        </button>
                        <button
                          onClick={() => markReviewed(assignment._id)}
                          disabled={assignment.status === "Reviewed"}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Mark Reviewed
                          </span>
                        </button>
                        <button
                          onClick={() => remove(assignment._id)}
                          className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-xl hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200"
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}