"use client";

// ======================================================
// IMPORTS
// ======================================================
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  CheckCircle2,
  MessageSquareText,
  PenLine,
  Send,
  Share2,
  Sparkles,
  X,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================
type Feedback = {
  id: string;
  name: string;
  role: string | null;
  message: string;
  avatar_url: string | null;
  card_color: string;
  created_at: string;
};

type FeedbackForm = {
  name: string;
  role: string;
  message: string;
  cardColor: string;
};

// ======================================================
// CARD COLOR STYLES
// Add or change card themes here
// ======================================================
const cardStyles: Record<string, string> = {
  purple:
    "from-purple-950 via-purple-900/90 to-violet-950 border-purple-500/30",
  green:
    "from-emerald-950 via-emerald-900/80 to-green-950 border-emerald-500/30",
  blue:
    "from-blue-950 via-sky-950 to-slate-950 border-blue-500/30",
  red:
    "from-red-950 via-rose-950 to-slate-950 border-red-500/30",
  indigo:
    "from-indigo-950 via-violet-950 to-slate-950 border-indigo-500/30",
  cyan:
    "from-cyan-950 via-slate-950 to-blue-950 border-cyan-500/30",
};

// ======================================================
// COLOR OPTIONS
// ======================================================
const colorOptions = [
  {
    label: "Purple",
    value: "purple",
    className: "bg-purple-600",
  },
  {
    label: "Green",
    value: "green",
    className: "bg-emerald-600",
  },
  {
    label: "Blue",
    value: "blue",
    className: "bg-blue-600",
  },
  {
    label: "Red",
    value: "red",
    className: "bg-red-600",
  },
  {
    label: "Indigo",
    value: "indigo",
    className: "bg-indigo-600",
  },
  {
    label: "Cyan",
    value: "cyan",
    className: "bg-cyan-600",
  },
];

// ======================================================
// DEFAULT FORM STATE
// ======================================================
const initialForm: FeedbackForm = {
  name: "",
  role: "",
  message: "",
  cardColor: "purple",
};

// ======================================================
// FEEDBACK WALL COMPONENT
// ======================================================
export default function FeedbackWall() {
  // Approved feedback returned from the API
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  // Controls the feedback modal
  const [formOpen, setFormOpen] = useState(false);

  // Feedback form state
  const [form, setForm] = useState<FeedbackForm>(initialForm);

  // Request states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Message shown after submit or on error
  const [statusMessage, setStatusMessage] = useState("");

  // ======================================================
  // LOAD APPROVED FEEDBACK
  // ======================================================
  const loadFeedback = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/feedback", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to load feedback.");
      }

      setFeedback(result.feedback ?? []);
    } catch (error) {
      console.error(error);
      setStatusMessage("Unable to load feedback right now.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFeedback();
  }, [loadFeedback]);

  // ======================================================
  // FORMAT DATE
  // ======================================================
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    []
  );

  // ======================================================
  // FORM INPUT HANDLER
  // ======================================================
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ======================================================
  // SUBMIT FEEDBACK
  // ======================================================
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit feedback.");
      }

      setStatusMessage(
        "Thank you. Your message was submitted for approval."
      );

      setForm(initialForm);

      window.setTimeout(() => {
        setFormOpen(false);
        setStatusMessage("");
      }, 1800);
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit feedback."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // ======================================================
    // MAIN FEEDBACK SECTION
    // Change id if your navigation uses another name
    // ======================================================
    <section
      id="feedback"
      className="relative overflow-hidden px-6 py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-purple-700/10 blur-3xl" />
        <div className="absolute right-1/4 top-40 h-72 w-72 rounded-full bg-cyan-700/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ==================================================
            SECTION HEADER
        =================================================== */}
        <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
              Visitor Wall
            </p>

            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Words that echo{" "}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text font-serif italic text-transparent">
                always
              </span>
            </h2>
          </div>

          {/* Open feedback form */}
          <motion.button
            type="button"
            onClick={() => {
              setStatusMessage("");
              setFormOpen(true);
            }}
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-950/70 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900"
          >
            <PenLine className="h-4 w-4" />
            Leave feedback
          </motion.button>
        </div>

        {/* ==================================================
            LOADING STATE
        =================================================== */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-[2rem] border border-white/10 bg-white/5"
              />
            ))}
          </div>
        )}

        {/* ==================================================
            EMPTY STATE
        =================================================== */}
        {!loading && feedback.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
            <MessageSquareText className="mx-auto h-10 w-10 text-cyan-300" />

            <h3 className="mt-5 text-xl font-semibold text-white">
              Be the first to leave a message
            </h3>

            <p className="mt-2 text-slate-400">
              Your feedback will appear here after approval.
            </p>

            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="mt-6 rounded-full bg-cyan-950 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-900"
            >
              Write a message
            </button>
          </div>
        )}

        {/* ==================================================
            FEEDBACK CARDS GRID
        =================================================== */}
        {!loading && feedback.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {feedback.map((item, index) => {
              const selectedCardStyle =
                cardStyles[item.card_color] ?? cardStyles.purple;

              return (
                <motion.article
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                    rotate: index % 2 === 0 ? -1 : 1,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: index % 2 === 0 ? -0.35 : 0.35,
                  }}
                  whileHover={{
                    y: -8,
                    rotate: 0,
                    scale: 1.015,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.06, 0.3),
                  }}
                  className={`group relative flex min-h-72 flex-col overflow-hidden rounded-[2rem] border bg-gradient-to-br ${selectedCardStyle} shadow-[0_25px_70px_rgba(0,0,0,0.35)]`}
                >
                  {/* Decorative artwork */}
                  <div className="pointer-events-none absolute inset-0 opacity-30">
                    <Sparkles className="absolute right-8 top-7 h-9 w-9 rotate-12 text-white" />
                    <div className="absolute bottom-24 left-10 h-20 w-20 rounded-full border-2 border-white/20" />
                    <div className="absolute right-12 top-24 h-14 w-14 rotate-45 border border-white/20" />
                  </div>

                  {/* Message */}
                  <div className="relative flex flex-1 items-center justify-center p-8 text-center">
                    <p className="max-w-md text-xl font-semibold leading-relaxed text-white sm:text-2xl">
                      “{item.message}”
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="relative flex items-center justify-between border-t border-white/10 bg-black/35 px-6 py-5 backdrop-blur-xl">
                    <div className="flex min-w-0 items-center gap-3">
                      {/* Avatar */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-bold text-white">
                        {item.name.slice(0, 1).toUpperCase()}
                      </div>

                      {/* Name and role */}
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-white">
                          {item.name}
                        </p>

                        <p className="truncate text-xs text-slate-400">
                          {item.role
                            ? `${item.role} • `
                            : ""}
                          {dateFormatter.format(
                            new Date(item.created_at)
                          )}
                        </p>
                      </div>
                    </div>

                    <Share2 className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-300" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================
          FEEDBACK FORM MODAL
      ====================================================== */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-lg"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) {
                setFormOpen(false);
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-8"
            >
              {/* Modal header */}
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
                    Visitor Wall
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Leave your message
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-cyan-950 hover:text-cyan-200"
                  aria-label="Close feedback form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Feedback form */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 grid gap-5"
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="feedback-name"
                    className="mb-2 block text-sm text-slate-300"
                  >
                    Name
                  </label>

                  <input
                    id="feedback-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={60}
                    required
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-700 focus:bg-cyan-950/20"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="feedback-role"
                    className="mb-2 block text-sm text-slate-300"
                  >
                    Role or company
                  </label>

                  <input
                    id="feedback-role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    maxLength={80}
                    placeholder="Developer, Recruiter, Designer..."
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-700 focus:bg-cyan-950/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="feedback-message"
                      className="text-sm text-slate-300"
                    >
                      Message
                    </label>

                    <span className="text-xs text-slate-500">
                      {form.message.length}/300
                    </span>
                  </div>

                  <textarea
                    id="feedback-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    maxLength={300}
                    rows={5}
                    required
                    placeholder="Share your thoughts about my portfolio..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-700 focus:bg-cyan-950/20"
                  />
                </div>

                {/* Card color */}
                <div>
                  <p className="mb-3 text-sm text-slate-300">
                    Card color
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((option) => {
                      const selected =
                        form.cardColor === option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setForm((previous) => ({
                              ...previous,
                              cardColor: option.value,
                            }))
                          }
                          className={`h-9 w-9 rounded-full border-2 transition ${
                            option.className
                          } ${
                            selected
                              ? "scale-110 border-white"
                              : "border-transparent opacity-70 hover:scale-105 hover:opacity-100"
                          }`}
                          aria-label={`Use ${option.label} card`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Status */}
                {statusMessage && (
                  <div className="flex items-start gap-2 rounded-2xl border border-cyan-800/40 bg-cyan-950/30 p-4 text-sm text-cyan-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{statusMessage}</p>
                  </div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={
                    submitting
                      ? undefined
                      : {
                          scale: 1.01,
                        }
                  }
                  whileTap={
                    submitting
                      ? undefined
                      : {
                          scale: 0.98,
                        }
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-700/50 bg-cyan-950 px-5 py-3 font-semibold text-cyan-200 transition hover:bg-cyan-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit feedback"}

                  {!submitting && <Send className="h-4 w-4" />}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}