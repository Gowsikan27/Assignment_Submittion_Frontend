"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [form, setForm] = useState({
    studentName: "",
    title: "",
    subject: "",
    description: "",
    fileUrl: ""
  });

  const submit = async () => {
    await axios.post("http://localhost:3000/assignments", form);
    alert("Submitted");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Assignment System</h1>

      <input
        placeholder="Student Name"
        onChange={e => setForm({ ...form, studentName: e.target.value })}
      />

      <input
        placeholder="Title"
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Subject"
        onChange={e => setForm({ ...form, subject: e.target.value })}
      />

      <input
        placeholder="File URL"
        onChange={e => setForm({ ...form, fileUrl: e.target.value })}
      />

      <button onClick={submit}>Submit</button>
    </div>
  );
}