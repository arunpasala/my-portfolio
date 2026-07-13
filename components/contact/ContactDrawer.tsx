"use client";

import {
  ArrowRight,
  CalendarDays,
  Mail,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
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
  const [isSending, setIsSending] =
    useState(false);
  const [isSent, setIsSent] =
    useState(false);
  const [isDarkMode, setIsDarkMode] =
    useState(true);

  // ======================================================
  // LOAD SAVED DRAWER THEME
  // ======================================================

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem(
        "contact-drawer-theme",
      );

    setIsDarkMode(savedTheme !== "light");
  }, []);

  // ======================================================
  // ESCAPE KEY + PAGE SCROLL LOCK
  // ======================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    const handleEscape = (
      event: globalThis.KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [isOpen, onClose]);

  // ======================================================
  // DRAWER THEME
  // ======================================================

  const toggleTheme = () => {
  setIsDarkMode((current) => {
    const nextTheme = !current;

    localStorage.setItem(
      "contact-drawer-theme",
      nextTheme ? "dark" : "light",
    );

    return nextTheme;
  });
};

  // ======================================================
  // SEND MESSAGE
  // ======================================================

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!message.trim() || isSending) {
      return;
    }

    setIsSending(true);
    setIsSent(false);

    try {
      const subject = encodeURIComponent(
        "Portfolio project inquiry",
      );

      const body = encodeURIComponent(
        `Hi Arun,

${message.trim()}

Sent from your portfolio contact drawer.`,
      );

      window.location.href =
        `mailto:balaarunpasala.dev@gmail.com?subject=${subject}&body=${body}`;

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setIsSent(true);
      setMessage("");

      window.setTimeout(() => {
        setIsSent(false);
      }, 2500);
    } finally {
      setIsSending(false);
    }
  };

  // ======================================================
  // CTRL / COMMAND + ENTER
  // ======================================================

  const handleTextareaKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === "Enter"
    ) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  const drawerTheme = isDarkMode
    ? "border-white/10 bg-[#07090f]/95 text-white"
    : "border-slate-200 bg-white/95 text-slate-950";

  const panelTheme = isDarkMode
    ? "border-white/10 bg-white/[0.025]"
    : "border-slate-200 bg-slate-50/90";

  const innerPanelTheme = isDarkMode
    ? "border-white/10 bg-black/20"
    : "border-slate-200 bg-white";

  const mutedText = isDarkMode
    ? "text-slate-500"
    : "text-slate-500";

  const controlTheme = isDarkMode
    ? "border-white/10 bg-white/[0.035] text-slate-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
    : "border-slate-200 bg-slate-100 text-slate-600 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ==================================================
              BACKDROP
          =================================================== */}

          <motion.button
            type="button"
            aria-label="Close contact drawer"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] cursor-default bg-black/70 backdrop-blur-md"
          />

          {/* ==================================================
              DRAWER
          =================================================== */}

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
className={`fixed right-0 top-0 z-[9999] h-dvh w-full overflow-y-auto border-l shadow-[-35px_0_100px_rgba(0,0,0,0.8)] backdrop-blur-3xl transition-colors duration-500 sm:max-w-[680px] ${drawerTheme}`}          >
            {/* ==================================================
                BACKGROUND EFFECTS
            =================================================== */}

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

              <div
                className={`absolute inset-0 bg-[size:42px_42px] ${
                  isDarkMode
                    ? "bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)]"
                }`}
              />
            </div>

            <div className="relative flex min-h-full flex-col p-4 sm:p-6">
              {/* ==================================================
                  HEADER
              =================================================== */}

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </span>

                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
                      Available to connect
                    </p>
                  </div>

                  <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">
                    Let&apos;s build something
                  </h1>

                  <p
                    className={`mt-2 max-w-md text-sm leading-6 ${mutedText}`}
                  >
                    Send a message, book a call,
                    or connect through one of my
                    professional profiles.
                  </p>
                </div>

                <div className="relative z-50 flex shrink-0 items-center gap-2 pointer-events-auto">
                  {/* Theme button */}

                  <motion.button
                    type="button"
                    onClick={toggleTheme}
                    whileHover={{
                      rotate: isDarkMode
                        ? -12
                        : 12,
                      scale: 1.06,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    aria-label={
                      isDarkMode
                        ? "Switch drawer to light mode"
                        : "Switch drawer to dark mode"
                    }
                    title={
                      isDarkMode
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                    }
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${controlTheme}`}
                  >
                    <AnimatePresence mode="wait">
                      {isDarkMode ? (
                        <motion.span
                          key="sun"
                          initial={{
                            opacity: 0,
                            rotate: -90,
                            scale: 0.6,
                          }}
                          animate={{
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            rotate: 90,
                            scale: 0.6,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                        >
                          <Sun size={20} />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="moon"
                          initial={{
                            opacity: 0,
                            rotate: 90,
                            scale: 0.6,
                          }}
                          animate={{
                            opacity: 1,
                            rotate: 0,
                            scale: 1,
                          }}
                          exit={{
                            opacity: 0,
                            rotate: -90,
                            scale: 0.6,
                          }}
                          transition={{
                            duration: 0.2,
                          }}
                        >
                          <Moon size={20} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Close button */}

                  <motion.button
  type="button"
  onClick={onClose}
  className={`relative z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition pointer-events-auto ${
    isDarkMode
      ? "border-white/10 bg-white/[0.035] text-slate-400 hover:border-rose-400/30 hover:bg-rose-400/10 hover:text-rose-300"
      : "border-slate-200 bg-slate-100 text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
  }`}
>
  <X size={22} />
</motion.button>
                </div>
              </div>

              {/* ==================================================
                  CONTENT PANEL
              =================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.14,
                  duration: 0.5,
                }}
                className={`mt-7 rounded-[2rem] border p-3 shadow-2xl backdrop-blur-2xl transition-colors duration-500 sm:p-4 ${panelTheme}`}
              >
                {/* Message form */}

                <form
                  onSubmit={handleSubmit}
                  className={`overflow-hidden rounded-[1.65rem] border transition-colors duration-500 ${innerPanelTheme}`}
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-violet-500/30 text-sm font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.18)]">
                          AP
                        </div>

                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-emerald-400 ${
                            isDarkMode
                              ? "border-[#11131a]"
                              : "border-white"
                          }`}
                        />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold sm:text-base">
                          Send Arun a message
                        </h2>

                        <p
                          className={`mt-0.5 text-xs sm:text-sm ${mutedText}`}
                        >
                          I read every message
                        </p>
                      </div>
                    </div>

                    <textarea
                      value={message}
                      onChange={(event) =>
                        setMessage(
                          event.target.value,
                        )
                      }
                      onKeyDown={
                        handleTextareaKeyDown
                      }
                      placeholder="Hey Arun, I have a project idea..."
                      rows={6}
                      aria-label="Message"
                      className={`mt-5 w-full resize-none bg-transparent text-base leading-7 outline-none sm:text-lg ${
                        isDarkMode
                          ? "text-white placeholder:text-slate-600"
                          : "text-slate-950 placeholder:text-slate-400"
                      }`}
                    />
                  </div>

                  <div
                    className={`flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
                      isDarkMode
                        ? "border-white/10"
                        : "border-slate-200"
                    }`}
                  >
                    <p
                      className={`text-xs ${
                        isDarkMode
                          ? "text-slate-600"
                          : "text-slate-400"
                      }`}
                    >
                      Press{" "}
                      <span
                        className={`rounded border px-1.5 py-0.5 ${
                          isDarkMode
                            ? "border-white/10 bg-white/5 text-slate-400"
                            : "border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        Ctrl
                      </span>{" "}
                      +{" "}
                      <span
                        className={`rounded border px-1.5 py-0.5 ${
                          isDarkMode
                            ? "border-white/10 bg-white/5 text-slate-400"
                            : "border-slate-200 bg-slate-100 text-slate-600"
                        }`}
                      >
                        Enter
                      </span>{" "}
                      to send
                    </p>

                    <motion.button
                      type="submit"
                      disabled={
                        !message.trim() ||
                        isSending
                      }
                      animate={
                        message.trim() &&
                        !isSending
                          ? {
                              x: [
                                0,
                                -2,
                                2,
                                -2,
                                2,
                                0,
                              ],
                            }
                          : undefined
                      }
                      transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatDelay: 4,
                      }}
                      whileHover={
                        message.trim() &&
                        !isSending
                          ? {
                              scale: 1.03,
                            }
                          : undefined
                      }
                      whileTap={
                        message.trim() &&
                        !isSending
                          ? {
                              scale: 0.96,
                            }
                          : undefined
                      }
                      className={`group relative flex h-11 items-center justify-center gap-3 overflow-hidden rounded-full border px-6 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                        isDarkMode
                          ? "border-white/10 bg-white/[0.055] text-slate-300 enabled:hover:border-cyan-300/30 enabled:hover:bg-cyan-300/10 enabled:hover:text-cyan-100"
                          : "border-slate-200 bg-slate-950 text-white enabled:hover:bg-cyan-700"
                      }`}
                    >
                      <motion.span
                        animate={{
                          x: [
                            "-170%",
                            "280%",
                          ],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          repeatDelay: 1.8,
                        }}
                        className="pointer-events-none absolute inset-y-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />

                      <span className="relative">
                        {isSending
                          ? "Opening email..."
                          : isSent
                            ? "Message ready"
                            : "Send message"}
                      </span>

                      {isSent ? (
                        <Send
                          size={16}
                          className="relative"
                        />
                      ) : (
                        <ArrowRight
                          size={16}
                          className="relative transition-transform duration-300 group-hover:translate-x-1"
                        />
                      )}
                    </motion.button>
                  </div>
                </form>

                {/* ==================================================
                    BOOK CALL + EMAIL
                =================================================== */}

                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <motion.a
                    href="https://cal.com/bala-arun-pasala-rumq6s"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`group relative flex min-h-[185px] flex-col items-center justify-center overflow-hidden rounded-[1.65rem] border p-6 text-center transition ${
                      isDarkMode
                        ? "border-white/10 bg-white/[0.025] hover:border-cyan-300/30 hover:bg-cyan-300/[0.05]"
                        : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-cyan-50"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-transparent transition duration-500 group-hover:from-cyan-400/[0.07]" />

                    <div className="relative flex items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/30 bg-gradient-to-br from-cyan-400/30 to-violet-500/30 text-lg font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                        AP
                      </div>

                      <span className="mx-3 text-xl text-slate-500">
                        +
                      </span>

                      <motion.div
                        animate={{
                          rotate: [
                            0,
                            5,
                            -5,
                            0,
                          ],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                          isDarkMode
                            ? "border-white/10 bg-white/[0.06]"
                            : "border-slate-200 bg-slate-100"
                        }`}
                      >
                        <CalendarDays
                          size={24}
                          className="text-slate-400 transition group-hover:text-cyan-500"
                        />
                      </motion.div>
                    </div>

                    <h3 className="relative mt-5 text-lg font-semibold">
                      Book a call
                    </h3>

                    <p
                      className={`relative mt-1 text-sm ${mutedText}`}
                    >
                      30 min · no strings
                    </p>
                  </motion.a>

                  <motion.a
                    href="mailto:balaarunpasala.dev@gmail.com"
                    whileHover={{
                      y: -5,
                      scale: 1.01,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className={`group relative flex min-h-[185px] flex-col items-center justify-center overflow-hidden rounded-[1.65rem] border p-6 text-center transition ${
                      isDarkMode
                        ? "border-white/10 bg-white/[0.025] hover:border-violet-300/30 hover:bg-violet-300/[0.05]"
                        : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50"
                    }`}
                  >
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
                        className="text-slate-400 transition group-hover:text-violet-400"
                      />
                    </motion.div>

                    <h3 className="relative mt-4 text-lg font-semibold">
                      Email me
                    </h3>

                    <p
                      className={`relative mt-1 break-all text-sm ${mutedText}`}
                    >
                      balaarunpasala.dev@gmail.com
                    </p>
                  </motion.a>
                </div>

                {/* ==================================================
                    SOCIAL LINKS
                =================================================== */}

                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <SocialLink
                    href="https://www.linkedin.com/in/balaarunpasala/"
                    label="LinkedIn"
                    icon={<LinkedInIcon />}
                    isDarkMode={isDarkMode}
                  />

                  <SocialLink
                    href="https://github.com/arunpasala"
                    label="GitHub"
                    icon={<GitHubIcon />}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </motion.div>

              <p
                className={`mt-auto pt-6 text-center text-xs ${
                  isDarkMode
                    ? "text-slate-600"
                    : "text-slate-400"
                }`}
              >
                Usually responds within 24 hours
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// ======================================================
// SOCIAL LINK
// ======================================================

type SocialLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  isDarkMode: boolean;
};

function SocialLink({
  href,
  label,
  icon,
  isDarkMode,
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
      className={`flex h-12 items-center justify-center gap-2 rounded-full border text-sm font-medium transition ${
        isDarkMode
          ? "border-white/10 bg-white/[0.025] text-slate-500 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          : "border-slate-200 bg-white text-slate-500 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
      }`}
    >
      <span className="flex h-4 w-4 items-center justify-center">
        {icon}
      </span>

      {label}
    </motion.a>
  );
}

// ======================================================
// LINKEDIN ICON
// ======================================================

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

// ======================================================
// GITHUB ICON
// ======================================================

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