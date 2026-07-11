"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  MessageSquarePlus,
  Quote,
  Send,
  X,
} from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar_url: string | null;
  title: string;
  message: string;
  card_color: string;
  created_at: string;
};

type TestimonialForm = {
  name: string;
  role: string;
  company: string;
  email: string;
  title: string;
  message: string;
  cardColor: string;
};

const initialForm: TestimonialForm = {
  name: "",
  role: "",
  company: "",
  email: "",
  title: "",
  message: "",
  cardColor: "purple",
};

const cardStyles: Record<string, string> = {
  purple:
    "border-purple-400/15 bg-gradient-to-br from-[#351036] via-[#230b27] to-[#18081d]",
  blue:
    "border-blue-400/15 bg-gradient-to-br from-[#202a6e] via-[#171d4d] to-[#101432]",
  green:
    "border-emerald-400/15 bg-gradient-to-br from-[#0b4140] via-[#092f31] to-[#061f22]",
  indigo:
    "border-indigo-400/15 bg-gradient-to-br from-[#25245f] via-[#191941] to-[#10112d]",
};

const colorOptions = [
  {
    name: "Purple",
    value: "purple",
    className: "bg-purple-600",
  },
  {
    name: "Blue",
    value: "blue",
    className: "bg-blue-600",
  },
  {
    name: "Green",
    value: "green",
    className: "bg-emerald-600",
  },
  {
    name: "Indigo",
    value: "indigo",
    className: "bg-indigo-600",
  },
];

async function readJson(response: Response) {
  const contentType =
    response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  return response.json();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [statusMessage, setStatusMessage] =
    useState("");

  const [form, setForm] =
    useState<TestimonialForm>(initialForm);

  const loadTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        "/api/testimonials",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to load testimonials."
        );
      }

      setTestimonials(
        result.testimonials ?? []
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load testimonials."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTestimonials();
  }, [loadTestimonials]);

  const visibleTestimonials = useMemo(() => {
    if (testimonials.length <= 3) {
      return testimonials;
    }

    return [0, 1, 2].map(
      (offset) =>
        testimonials[
          (activeIndex + offset) %
            testimonials.length
        ]
    );
  }, [activeIndex, testimonials]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? Math.max(testimonials.length - 1, 0)
        : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      testimonials.length === 0
        ? 0
        : (current + 1) % testimonials.length
    );
  };

  const submitTestimonial = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setErrorMessage("");
      setStatusMessage("");

      const response = await fetch(
        "/api/testimonials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            role: form.role,
            company: form.company,
            email: form.email,
            title: form.title,
            message: form.message,
            cardColor: form.cardColor,
          }),
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to submit testimonial."
        );
      }

      setStatusMessage(result.message);
      setForm(initialForm);

      window.setTimeout(() => {
        setModalOpen(false);
        setStatusMessage("");
      }, 1800);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit testimonial."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#09090a] px-5 py-24 text-white sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/3 h-72 w-72 rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-fuchsia-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-[1500px]">
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
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
            Testimonials
          </p>

          <h2 className="mt-6 text-5xl font-light tracking-tight sm:text-6xl lg:text-7xl">
            <span className="font-serif text-white">
              Word on the street
            </span>{" "}
            <span className="testimonial-gradient font-serif italic">
              about me
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
            Feedback from people who have worked with
            me, collaborated on projects, or reviewed
            my work.
          </p>

          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setStatusMessage("");
              setModalOpen(true);
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-xl border border-purple-400/20 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-200 transition hover:bg-purple-500/15"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Add a testimonial
          </button>
        </motion.header>

        {loading && (
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[430px] animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[0.035]"
              />
            ))}
          </div>
        )}

        {!loading && errorMessage && !modalOpen && (
          <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-red-500/20 bg-red-950/20 p-5 text-center text-red-300">
            {errorMessage}
          </div>
        )}

        {!loading &&
          testimonials.length > 0 && (
            <>
              <div className="mt-14 grid gap-5 md:grid-cols-3">
                {visibleTestimonials.map(
                  (testimonial, index) => (
                    <motion.article
                      key={`${testimonial.id}-${index}`}
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
                        delay: index * 0.1,
                        duration: 0.6,
                      }}
                      className={`flex min-h-[430px] flex-col rounded-[1.75rem] border p-7 sm:p-8 ${
                        cardStyles[
                          testimonial.card_color
                        ] ?? cardStyles.purple
                      }`}
                    >
                      <Quote className="h-8 w-8 text-white/20" />

                      <h3 className="mt-5 text-xl font-semibold leading-snug sm:text-2xl">
                        {testimonial.title}
                      </h3>

                      <p className="mt-5 leading-8 text-white/65">
                        {testimonial.message}
                      </p>

                      <div className="mt-auto flex items-center gap-3 pt-8">
                        {testimonial.avatar_url ? (
                          <img
                            src={
                              testimonial.avatar_url
                            }
                            alt={testimonial.name}
                            referrerPolicy="no-referrer"
                            className="h-12 w-12 rounded-full border border-white/15 object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-bold">
                            {getInitials(
                              testimonial.name
                            )}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-semibold">
                            {testimonial.name}
                          </p>

                          <p className="truncate text-sm text-white/45">
                            {[
                              testimonial.role,
                              testimonial.company,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  )
                )}
              </div>

              {testimonials.length > 3 && (
                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={showPrevious}
                    aria-label="Previous testimonials"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-4">
                    {testimonials.map(
                      (item, index) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() =>
                            setActiveIndex(index)
                          }
                          aria-label={`Show testimonial ${
                            index + 1
                          }`}
                          className={`h-2.5 rounded-full transition-all ${
                            index === activeIndex
                              ? "w-10 bg-white/70"
                              : "w-2.5 bg-white/25 hover:bg-white/45"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next testimonials"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
      </div>

      <AnimatePresence>
        {modalOpen && (
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
            onMouseDown={(event) => {
              if (
                event.currentTarget ===
                event.target
              ) {
                setModalOpen(false);
              }
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 25,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}
              className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#111] p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
                    Testimonials
                  </p>

                  <h3 className="mt-2 text-3xl font-semibold">
                    Share your experience
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/45">
                    Your testimonial will appear after
                    it is reviewed and approved.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalOpen(false)
                  }
                  aria-label="Close testimonial form"
                  className="rounded-full border border-white/10 p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={submitTestimonial}
                className="mt-7 grid gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      required
                      maxLength={80}
                      placeholder="Your name"
                      className="testimonial-input"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email:
                            event.target.value,
                        }))
                      }
                      placeholder="you@example.com"
                      className="testimonial-input"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Role">
                    <input
                      value={form.role}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          role: event.target.value,
                        }))
                      }
                      placeholder="Founder, developer..."
                      className="testimonial-input"
                    />
                  </Field>

                  <Field label="Company">
                    <input
                      value={form.company}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          company:
                            event.target.value,
                        }))
                      }
                      placeholder="Company or team"
                      className="testimonial-input"
                    />
                  </Field>
                </div>

                <Field label="Testimonial title">
                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    required
                    maxLength={120}
                    placeholder="A developer who listens"
                    className="testimonial-input"
                  />
                </Field>

                <Field label="Your testimonial">
                  <textarea
                    value={form.message}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        message:
                          event.target.value,
                      }))
                    }
                    required
                    maxLength={700}
                    rows={7}
                    placeholder="Describe your experience..."
                    className="testimonial-input resize-none"
                  />
                </Field>

                <div>
                  <p className="mb-3 text-sm text-white/55">
                    Card color
                  </p>

                  <div className="flex gap-3">
                    {colorOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            cardColor:
                              option.value,
                          }))
                        }
                        aria-label={`Select ${option.name}`}
                        className={`h-10 w-10 rounded-full border-2 transition ${
                          option.className
                        } ${
                          form.cardColor ===
                          option.value
                            ? "scale-110 border-white"
                            : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-sm text-red-300">
                    {errorMessage}
                  </div>
                )}

                {statusMessage && (
                  <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-sm text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}

                  Submit testimonial
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <span className="mb-2 block text-sm text-white/55">
        {label}
      </span>

      {children}
    </label>
  );
}