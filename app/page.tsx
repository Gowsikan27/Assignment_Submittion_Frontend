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

  // 🔄 READ (get assignments)
  const fetchAssignments = async () => {
    const res = await axios.get("http://localhost:3000/assignments");
    setAssignments(res.data);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // ➕ CREATE (submit)
  const submit = async () => {
    await axios.post("http://localhost:3000/assignments", form);

    // clear form
    setForm({
      studentName: "",
      title: "",
      subject: "",
      description: "",
      fileUrl: ""
    });

    // refresh list
    fetchAssignments();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Assignment System</h1>

      {/* 📝 FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Student Name"
          value={form.studentName}
          onChange={e =>
            setForm({ ...form, studentName: e.target.value })
          }
        />

        <input
          placeholder="Title"
          value={form.title}
          onChange={e =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={e =>
            setForm({ ...form, subject: e.target.value })
          }
        />

        <input
          placeholder="File URL"
          value={form.fileUrl}
          onChange={e =>
            setForm({ ...form, fileUrl: e.target.value })
          }
        />

        <button onClick={submit}>Submit</button>
      </div>

      <hr />

      {/* 📋 LIST */}
      <h2>All Assignments</h2>

      {assignments.map((a) => (
        <div
          key={a._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{a.title}</h3>
          <p><b>Student:</b> {a.studentName}</p>
          <p><b>Subject:</b> {a.subject}</p>
          <p><b>Status:</b> {a.status}</p>
        </div>
      ))}
    </div>
  );
}