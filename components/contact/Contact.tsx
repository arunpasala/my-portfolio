"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Mail,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      form.subject || `Portfolio message from ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}
Email: ${form.email}

Message:
${form.message}`
    );

    window.location.href =
      `mailto:balaarunpasala.dev@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 2500);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#050611] dark:text-white px-5 py-24  sm:px-8"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[160px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.header
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-cyan-300">
            Contact
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Let&apos;s build something{" "}
            <span className="contact-gradient-text">
              professional and impactful.
            </span>
          </h2>
        </motion.header>

        {/* Animated availability banner */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: 0.15,
            duration: 0.7,
          }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d19] p-1"
        >
          <div className="relative min-h-[190px] overflow-hidden rounded-[1.8rem] bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.18),transparent_40%)] px-7 py-12 sm:px-12">
            {/* Decorative glowing lines */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />

              <motion.div
                animate={{
                  x: ["-100%", "180%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent"
              />
            </div>

            {/* Bouncing open-to-work pill */}
            <motion.div
              animate={{
                x: [0, 220, 0, -220, 0],
                y: [0, -22, 0, 22, 0],
                rotate: [0, 6, 0, -6, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-5 z-20 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-cyan-300/25 bg-[#07141c]/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)] backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>

                Open to work & freelancing
              </div>
            </motion.div>

            <div className="relative z-10 mx-auto max-w-4xl pt-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
                <BriefcaseBusiness className="h-6 w-6" />
              </div>

              <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                From concept to creation
              </h3>

              <p className="mx-auto mt-3 max-w-2xl leading-7 text-white/50">
                I&apos;m available for full-time software engineering roles,
                freelance projects, product collaborations, and modern
                full-stack development opportunities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact layout */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Contact details */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl sm:p-10"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                Let&apos;s collaborate
              </div>

              <h3 className="mt-6 text-3xl font-semibold">
                Get in touch
              </h3>

              <p className="mt-5 max-w-xl leading-8 text-slate-400">
                I&apos;m currently open to software engineering, frontend,
                backend, and full-stack opportunities. I enjoy building
                scalable products with polished interfaces, secure
                architecture, and reliable backend systems.
              </p>

              <div className="mt-9 grid gap-4">
                <motion.a
                  href="mailto:balaarunpasala.dev@gmail.com"
                  whileHover={{
                    x: 6,
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      Email
                    </p>

                    <p className="mt-1 truncate text-sm text-white/75 sm:text-base">
                      balaarunpasala.dev@gmail.com
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+14133818673"
                  whileHover={{
                    x: 6,
                  }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-white/35">
                      Phone
                    </p>

                    <p className="mt-1 text-sm text-white/75 sm:text-base">
                      +1 (413) 381-8673
                    </p>
                  </div>
                </motion.a>
              </div>

              <div className="mt-9 rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm font-semibold text-white/75">
                  Current availability
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-emerald-300">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>

                  Available for new opportunities
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-2xl sm:p-10"
          >
            <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="relative grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    required
                    placeholder="Your Name"
                    className="contact-input"
                  />
                </Field>

                <Field label="Email address">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    required
                    placeholder="Email"
                    className="contact-input"
                  />
                </Field>
              </div>

              <Field label="Subject">
                <input
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                  required
                  placeholder="Subject"
                  className="contact-input"
                />
              </Field>

              <Field label="Project details">
                <textarea
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                  required
                  rows={7}
                  placeholder="Tell me about your project..."
                  className="contact-input resize-none"
                />
              </Field>

              <motion.button
                type="submit"
                animate={
                  submitted
                    ? {
                        scale: [1, 1.04, 1],
                      }
                    : {
                        x: [0, -2, 2, -2, 2, 0],
                      }
                }
                transition={
                  submitted
                    ? {
                        duration: 0.4,
                      }
                    : {
                        duration: 0.45,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }
                }
                whileHover={{
                  scale: 1.035,
                  x: [0, -3, 3, -3, 3, 0],
                  transition: {
                    duration: 0.35,
                  },
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="group relative mt-1 inline-flex w-fit items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white px-7 py-4 font-semibold text-black shadow-[0_15px_45px_rgba(255,255,255,0.12)]"
              >
                <motion.span
                  animate={{
                    x: ["-180%", "260%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 1.5,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent blur-sm"
                />

                <span className="relative flex items-center gap-3">
                  {submitted ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      Message ready
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      <style jsx>{`
        .contact-input {
          width: 100%;
          border-radius: 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.045);
          padding: 1rem 1.1rem;
          color: white;
          outline: none;
          transition:
            border-color 180ms ease,
            background-color 180ms ease,
            box-shadow 180ms ease,
            transform 180ms ease;
        }

        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.32);
        }

        .contact-input:focus {
          border-color: rgba(34, 211, 238, 0.5);
          background: rgba(255, 255, 255, 0.065);
          box-shadow:
            0 0 0 4px rgba(34, 211, 238, 0.07),
            0 12px 40px rgba(0, 0, 0, 0.18);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}