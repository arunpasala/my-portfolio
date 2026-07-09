"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSending(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send");
      }

      setStatus("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setStatus(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">

      <div className="grid gap-5 sm:grid-cols-2">

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          required
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
        />

      </div>

      <input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        required
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
      />

      <textarea
        rows={6}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Tell me about your project..."
        required
        className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
      />

      <button
        disabled={sending}
        className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-slate-950"
      >
        {sending ? "Sending..." : "Send Message"}

        {!sending && (
          <ArrowRight className="h-4 w-4" />
        )}
      </button>

      {status && (
        <p className="text-cyan-300 text-sm">
          {status}
        </p>
      )}

    </form>
  );
}