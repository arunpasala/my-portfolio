"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Code2,
  Download,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Profile", href: "#profile" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Frontend Development",
    desc: "Modern, responsive, high-performance interfaces with React, Next.js, and Tailwind CSS.",
    icon: Code2,
  },
  {
    title: "Full-Stack Web Apps",
    desc: "Scalable applications with clean architecture, API integration, authentication, and database support.",
    icon: Layers3,
  },
  {
    title: "UI/UX Prototyping",
    desc: "Professional product-focused layouts, wireframes, interactive sections, and polished portfolio experiences.",
    icon: Sparkles,
  },
];

const projects = [
  {
    title: "CircleSave",
    subtitle: "Secure savings circle platform",
    desc: "A role-based fintech-style platform focused on trust, transparency, contribution tracking, and structured payout workflows.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    live: "#",
    code: "#",
  },
  {
    title: "AI & Project Management",
    subtitle: "Research and model evaluation",
    desc: "A research project exploring how AI improves planning, risk management, fairness evaluation, and execution in project workflows.",
    tech: ["Python", "ML", "Data Analysis", "Research"],
    live: "#",
    code: "#",
  },
  {
    title: "Business Website Projects",
    subtitle: "Client-focused web experiences",
    desc: "Responsive and conversion-friendly websites built with strong emphasis on usability, visual hierarchy, and maintainable structure.",
    tech: ["WordPress", "JavaScript", "CSS", "UI/UX"],
    live: "#",
    code: "#",
  },
];

const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Git",
  "REST APIs",
  "UI/UX",
  "Responsive Design",
];

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl ${className}`}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded-full bg-white/10" />
        <div className="h-8 w-3/4 rounded-xl bg-white/10" />
        <div className="h-4 w-full rounded-xl bg-white/10" />
        <div className="h-4 w-5/6 rounded-xl bg-white/10" />
        <div className="flex gap-3 pt-2">
          <div className="h-10 w-28 rounded-2xl bg-white/10" />
          <div className="h-10 w-24 rounded-2xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

// ===============================
// REUSABLE SECTION HEADING
// Change section label/title here if needed.
// Description is optional and hidden if you do not pass it.
// ===============================
function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-cyan-300/80">
        {label}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ===============================
  // CONTACT FORM STATE
  // Change these fields only if you add/remove inputs in the contact form.
  // ===============================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Shows button loading state while message is sending.
  const [sending, setSending] = useState(false);

  // Shows success/error message below the contact form.
  const [status, setStatus] = useState("");

  // ===============================
  // CONTACT FORM INPUT HANDLER
  // This updates formData whenever user types in the inputs.
  // ===============================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // CONTACT FORM SUBMIT HANDLER
  // This sends the form data to app/api/contact/route.ts.
  // Your email notification is sent from that backend route.
  // ===============================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus("Message sent successfully. I will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(
    () => [
      { label: "Projects Built", value: "5+" },
      { label: "Core Stack", value: "Software-engineering" },
      { label: "Focus", value: "Full-Stack" },
    ],
    []
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* ===============================
          HEADER / NAVBAR SECTION
          Change nav links in navItems array at the top.
      =============================== */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
              <span className="text-sm font-bold tracking-widest text-cyan-300">
                AP
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Bala Arun Pasala</p>
              <p className="text-xs text-slate-400">
                Developer • Designer • Builder
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
            >
              Let’s Connect <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-slate-950/90 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===============================
          HOME / LANDING SECTION
          Change hero title, subtitle, buttons, and stats here.
      =============================== */}
      <section id="home" className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:pt-20">
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <SkeletonCard className="min-h-[24rem]" />
            <SkeletonCard className="min-h-[24rem]" />
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles className="h-4 w-4" /> Available for Full-Stack Roles
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                Building modern digital products with
                <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {" "}
                  clean code and premium design.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                I’m Arun, a developer focused on Next.js, full-stack systems,
                UI/UX, and product-driven web experiences that look professional
                and perform well.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                >
                  View Projects <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
                >
                  Hire Me <Mail className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                >
                  Download Resume <Download className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.5 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="absolute -right-6 bottom-10 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Portfolio Preview</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Professional Presence
                    </h3>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                    <Briefcase className="h-5 w-5 text-cyan-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                      Focus Areas
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Full-Stack", "Frontend", "UI/UX", "Next.js"].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <User className="h-5 w-5 text-cyan-300" />
                      <p className="mt-4 text-sm text-slate-400">Role Target</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        Software Engineer
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                      <GraduationCap className="h-5 w-5 text-fuchsia-300" />
                      <p className="mt-4 text-sm text-slate-400">Education</p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        MS Computer Science
                      </p>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/15 to-blue-500/10 p-5">
                    <p className="text-sm text-slate-300">
                      A strong portfolio should show your value clearly, guide
                      recruiters quickly, and make your work memorable.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* ===============================
          PROFILE SECTION
          Change your summary, education, and skills here.
      =============================== */}
      <section id="profile" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          label="Profile"
          title="A professional introduction that feels modern and credible."
/>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-3xl font-bold text-cyan-300">
              AP
            </div>
            <h3 className="mt-6 text-2xl font-semibold">Arun Pasala</h3>
            <p className="mt-2 text-slate-400">
              Full-Stack Developer | Next.js Developer | UI-Focused Builder
            </p>
            <p className="mt-6 leading-8 text-slate-300">
              I build web products that combine strong frontend design,
              practical backend logic, and professional user experiences. My
              focus is on creating applications that feel polished, scalable,
              and useful.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Education
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  Master’s in Computer Science
                </p>
                <p className="mt-2 text-slate-300">
                  Western New England University
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Experience
                </p>
                <p className="mt-3 text-lg font-semibold text-white">
                  WordPress Development
                </p>
                <p className="mt-2 text-slate-300">
                  Frontend, UI work, client-focused web delivery
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Skills
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================
          SERVICES SECTION
          Change service cards in services array at the top.
      =============================== */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          label="Services"
          title="What I can help build and improve."
/>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/8 p-7 backdrop-blur-2xl"
              >
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 p-3">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===============================
          PROJECTS SECTION
          Change project cards in projects array at the top.
      =============================== */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          label="Projects"
          title="Selected work that shows problem solving and product thinking."
/>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-[2rem] border border-white/10 bg-white/8 p-7 backdrop-blur-2xl transition hover:-translate-y-1 hover:bg-white/[0.09]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-cyan-300">{project.subtitle}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                  <ExternalLink className="h-4 w-4 text-slate-200" />
                </div>
              </div>

              <p className="mt-5 leading-7 text-slate-300">{project.desc}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <a
                  href={project.live}
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-slate-950"
                >
                  Live Demo
                </a>
                <a
                  href={project.code}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white"
                >
                  Source Code
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===============================
          CONTACT SECTION
          Change your contact email/phone text on the left side.
          The form on the right sends data to /api/contact.
      =============================== */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          label="Contact"
          title="Let’s build something professional and impactful."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* CONTACT INFO CARD - Change email, phone, or description here */}
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
            <h3 className="text-2xl font-semibold text-white">Get in touch</h3>
            <p className="mt-4 leading-7 text-slate-300">
              I’m currently open to software engineering, backend, frontend, and
              full-stack opportunities. I’m especially interested in building
              scalable products with strong user experience, secure architecture,
              and reliable backend systems.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="h-5 w-5 text-cyan-300" />
                <span>balaarunpasala.dev@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-5 w-5 text-cyan-300" />
                <span>+1 (413) 381-8673</span>
              </div>
            </div>
          </div>

          {/* CONTACT FORM CARD - This form sends message details to your email */}
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
            <form onSubmit={handleSubmit} className="grid gap-5">
              {/* NAME AND EMAIL INPUTS */}
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  required
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
                />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  required
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
                />
              </div>

              {/* SUBJECT INPUT */}
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                required
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
              />

              {/* MESSAGE TEXTAREA */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me about your project or opportunity"
                required
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none"
              />

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-fit items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
                {!sending && <ArrowRight className="h-4 w-4" />}
              </button>

              {/* SUCCESS / ERROR MESSAGE */}
              {status && (
                <p className="text-sm text-cyan-300">
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ===============================
          FOOTER SECTION
          Change copyright text and footer links here.
      =============================== */}
      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-sm text-slate-400 sm:flex-row sm:items-center">
          <p>
            © 2026 Arun Portfolio. Crafted with Next.js and
            glassmorphism-inspired design.
          </p>
          <div className="flex items-center gap-5">
            <a href="#home" className="hover:text-white">
              Home
            </a>
            <a href="#projects" className="hover:text-white">
              Projects
            </a>
            <a href="#contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}