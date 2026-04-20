"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [form, setForm] = useState({
    studentName: "",
    title: "",
    subject: "",
    description: "",
    fileUrl: ""
  });

  const [assignments, setAssignments] = useState<any[]>([]);

  // 🔄 READ
  const fetchAssignments = async () => {
    const res = await axios.get("http://localhost:5000/assignments");
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // ➕ CREATE
  const submit = async () => {
    await axios.post("http://localhost:5000/assignments", form);

    setForm({
      studentName: "",
      title: "",
      subject: "",
      description: "",
      fileUrl: ""
    });

    fetchAssignments();
  };

  // 🔄 UPDATE
  const markReviewed = async (id: string) => {
    await axios.put(`http://localhost:5000/assignments/${id}`, {
      status: "Reviewed"
    });
    fetchAssignments();
  };

  // ❌ DELETE
  const remove = async (id: string) => {
    await axios.delete(`http://localhost:5000/assignments/${id}`);
    fetchAssignments();
  };

  return (
    <div style={{
      padding: "32px",
      maxWidth: 700,
      margin: "0 auto",
      fontFamily: "Segoe UI, Arial, sans-serif",
      background: "#f7f9fa"
    }}>
      <h1 style={{ textAlign: "center", color: "#2d3748", marginBottom: 32 }}>📚 Assignment System</h1>

      {/* 📝 FORM */}
      <div style={{
        marginBottom: "32px",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}>
        <h2 style={{margin: 0, color: "#4a5568"}}>Add Assignment</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            placeholder="Student Name"
            value={form.studentName}
            onChange={e => setForm({ ...form, studentName: e.target.value })}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
          />
          <input
            placeholder="Title"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
          />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            placeholder="Subject"
            value={form.subject}
            onChange={e => setForm({ ...form, subject: e.target.value })}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
          />
          <input
            placeholder="File URL"
            value={form.fileUrl}
            onChange={e => setForm({ ...form, fileUrl: e.target.value })}
            style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          style={{ padding: 10, borderRadius: 6, border: "1px solid #cbd5e1", resize: "vertical", minHeight: 60 }}
        />
        <button
          onClick={submit}
          style={{
            background: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 0",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
            marginTop: 8
          }}
        >
          Submit
        </button>
      </div>

      <hr style={{margin: "32px 0"}} />

      {/* 📋 LIST */}
      <h2 style={{ color: "#2d3748" }}>All Assignments</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {assignments.map((a) => (
          <div
            key={a._id}
            style={{
              border: "1px solid #e2e8f0",
              background: "#fff",
              borderRadius: 10,
              padding: "18px 20px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              gap: 6
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, color: "#2563eb" }}>{a.title}</h3>
              <span style={{
                background: a.status === "Reviewed" ? "#38a169" : "#e53e3e",
                color: "#fff",
                borderRadius: 12,
                padding: "2px 14px",
                fontSize: 13,
                fontWeight: 500
              }}>{a.status}</span>
            </div>
            <p style={{ margin: 0 }}><b>Student:</b> {a.studentName}</p>
            <p style={{ margin: 0 }}><b>Subject:</b> {a.subject}</p>
            {a.description && <p style={{ margin: 0, color: "#4a5568" }}>{a.description}</p>}
            {a.fileUrl && <a href={a.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#3182ce" }}>View File</a>}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button
                onClick={() => markReviewed(a._id)}
                style={{
                  background: "#38a169",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "7px 18px",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Mark Reviewed
              </button>
              <button
                onClick={() => remove(a._id)}
                style={{
                  background: "#e53e3e",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "7px 18px",
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}