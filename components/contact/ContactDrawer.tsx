"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Mail,
  Moon,
  Send,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";

type ContactDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactDrawer({
  isOpen,
  onClose,
}: ContactDrawerProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!message.trim() || isSending) {
      return;
    }

    setIsSending(true);

    try {
      const subject = encodeURIComponent("Portfolio project inquiry");
      const body = encodeURIComponent(message.trim());

      window.location.href = `mailto:your-email@gmail.com?subject=${subject}&body=${body}`;

      await new Promise((resolve) => setTimeout(resolve, 700));

      setIsSent(true);
      setMessage("");

      window.setTimeout(() => {
        setIsSent(false);
      }, 2500);
    } finally {
      setIsSending(false);
    }
  };

  const handleTextareaKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();

      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close contact drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] cursor-default bg-black/70 backdrop-blur-md"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Contact Bala Arun Pasala"
            initial={{
              x: "105%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: "105%",
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 28,
              mass: 0.9,
            }}
            className="fixed right-0 top-0 z-[100] h-dvh w-full overflow-y-auto border-l border-white/10 bg-[#07090f]/95 shadow-[-35px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl sm:max-w-[680px]"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  x: [0, 60, 0],
                  y: [0, 35, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-24 top-12 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]"
              />

              <motion.div
                animate={{
                  x: [0, -45, 0],
                  y: [0, -35, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 13,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[130px]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:42px_42px]" />
            </div>

            <div className="relative flex min-h-full flex-col p-3 sm:p-5">
              <div className="flex items-center gap-2.5">
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{
                    scale: 1.015,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="group flex h-14 flex-1 items-center gap-4 rounded-full border border-white/10 bg-white/[0.035] px-5 text-left text-white shadow-lg transition-colors hover:border-white/20 hover:bg-white/[0.065]"
                >
                  <ArrowLeft
                    size={18}
                    className="text-slate-500 transition duration-300 group-hover:-translate-x-1 group-hover:text-white"
                  />

                  <span className="text-base font-semibold">
                    Reach out
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{
                    rotate: -12,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  aria-label="Theme button"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-400 transition hover:border-white/20 hover:bg-white/[0.065] hover:text-white"
                >
                  <Moon size={21} />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{
                    rotate: 90,
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  aria-label="Close contact drawer"
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-slate-400 transition hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.14,
                  duration: 0.5,
                }}
                className="mt-4 rounded-[2rem] border border-white/10 bg-white/[0.025] p-3 shadow-2xl backdrop-blur-2xl sm:p-4"
              >
                <form
                  onSubmit={handleSubmit}
                  className="overflow-hidden rounded-[1.65rem] border border-white/10 bg-black/20"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 text-sm font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                          AP
                        </div>

                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#11131a] bg-emerald-400" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-white sm:text-base">
                          Send Arun a message
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                          I read every message
                        </p>
                      </div>
                    </div>

                    <textarea
                      value={message}
                      onChange={(event) =>
                        setMessage(event.target.value)
                      }
                      onKeyDown={handleTextareaKeyDown}
                      placeholder="Hey Arun, I have a project idea..."
                      rows={5}
                      aria-label="Message"
                      className="mt-5 w-full resize-none bg-transparent text-base leading-7 text-white outline-none placeholder:text-slate-600 sm:text-lg"
                    />
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-600">
                      Press{" "}
                      <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-slate-400">
                        Ctrl
                      </span>{" "}
                      +{" "}
                      <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-slate-400">
                        Enter
                      </span>{" "}
                      to continue
                    </p>

                    <motion.button
                      type="submit"
                      disabled={!message.trim() || isSending}
                      whileHover={
                        message.trim() && !isSending
                          ? {
                              scale: 1.03,
                            }
                          : undefined
                      }
                      whileTap={
                        message.trim() && !isSending
                          ? {
                              scale: 0.96,
                            }
                          : undefined
                      }
                      className="group flex h-11 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.055] px-6 text-sm font-semibold text-slate-300 transition enabled:hover:border-cyan-300/30 enabled:hover:bg-cyan-300/10 enabled:hover:text-cyan-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isSending
                        ? "Opening email..."
                        : isSent
                          ? "Ready to send"
                          : "Continue"}

                      {isSent ? (
                        <Send size={16} />
                      ) : (
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      )}
                    </motion.button>
                  </div>
                </form>

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <motion.a
                    href="https://cal.com/bala-arun-pasala-rumq6s"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="group relative flex min-h-[195px] flex-col items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.025] p-6 text-center transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-transparent transition duration-500 group-hover:from-cyan-400/[0.07]" />

                    <div className="relative flex items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-lg font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                        AP
                      </div>

                      <span className="mx-3 text-xl text-slate-500">
                        +
                      </span>

                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                        <CalendarDays
                          size={24}
                          className="text-slate-400 transition group-hover:text-cyan-200"
                        />
                      </div>
                    </div>

                    <h3 className="relative mt-5 text-lg font-semibold text-white">
                      Book a call
                    </h3>

                    <p className="relative mt-1 text-sm text-slate-500">
                      30 min · no strings
                    </p>
                  </motion.a>

                  <motion.a
                    href="mailto:balaarunpasala.dev@gmail.com"
                    whileHover={{
                      y: -5,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="group relative flex min-h-[195px] flex-col items-center justify-center overflow-hidden rounded-[1.65rem] border border-white/10 bg-white/[0.025] p-6 text-center transition hover:border-violet-300/30 hover:bg-violet-300/[0.05]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-400/0 to-transparent transition duration-500 group-hover:from-violet-400/[0.07]" />

                    <motion.div
                      whileHover={{
                        rotate: -6,
                        scale: 1.08,
                      }}
                      className="relative flex h-16 w-16 items-center justify-center"
                    >
                      <Mail
                        size={48}
                        strokeWidth={1.35}
                        className="text-slate-400 transition group-hover:text-violet-300"
                      />
                    </motion.div>

                    <h3 className="relative mt-4 text-lg font-semibold text-white">
                      Email me
                    </h3>

                    <p className="relative mt-1 break-all text-sm text-slate-500">
                      balaarunpasala.dev@gmail.com
                    </p>
                  </motion.a>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <SocialLink
                    href="https://www.linkedin.com/in/balaarunpasala/"
                    label="LinkedIn"
                    icon={<LinkedInIcon />}
                  />

                  <SocialLink
                    href="https://x.com/YOUR-X-USERNAME"
                    label="X / Twitter"
                    icon={<XSocialIcon />}
                  />

                  <SocialLink
                    href="https://github.com/arunpasala"
                    label="GitHub"
                    icon={<GitHubIcon />}
                  />
                </div>
              </motion.div>

              <p className="mt-auto pt-6 text-center text-xs text-slate-600">
                Usually responds within 24 hours
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
};

function SocialLink({
  href,
  label,
  icon,
}: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.025] text-sm font-medium text-slate-500 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
    >
      <span className="flex h-4 w-4 items-center justify-center">
        {icon}
      </span>

      {label}
    </motion.a>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5.25 3.5A1.75 1.75 0 1 1 5.25 7a1.75 1.75 0 0 1 0-3.5ZM3.75 8.5h3v11h-3v-11Zm5 0h2.88V10c.8-1.17 2.03-1.9 3.78-1.9 3.03 0 4.84 1.94 4.84 5.65v5.75h-3v-5.36c0-2.04-.72-3.43-2.54-3.43-1.39 0-2.21.94-2.58 1.84-.14.32-.18.77-.18 1.23v5.72h-3v-11Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.35 9.35 0 0 1 12 7.13a9.2 9.2 0 0 1 2.5.34c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function XSocialIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.9 3H22l-6.77 7.74L23.2 21h-6.24l-4.89-6.39L6.48 21H3.36l7.24-8.28L2.96 3H9.36l4.42 5.84L18.9 3Zm-1.1 16.2h1.72L8.42 4.71H6.57L17.8 19.2Z" />
    </svg>
  );
}