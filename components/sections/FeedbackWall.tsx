"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Session, User } from "@supabase/supabase-js";
import {
  CheckCircle2,
  LoaderCircle,
  LogOut,
  PenLine,
  Send,
  Share2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

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
  role: string;
  message: string;
  cardColor: string;
};

type OAuthProvider = "google" | "github";

// ======================================================
// CARD THEMES
// ======================================================

const cardStyles: Record<string, string> = {
  purple:
    "from-[#552081] via-[#411667] to-[#32104f] border-purple-400/20",
  green:
    "from-[#06432f] via-[#043524] to-[#03271b] border-emerald-400/20",
  blue:
    "from-[#082c50] via-[#061e38] to-[#041426] border-blue-400/20",
  red:
    "from-[#791d20] via-[#5c1317] to-[#3c0d11] border-red-400/20",
  indigo:
    "from-[#292c76] via-[#1b1d55] to-[#11133b] border-indigo-400/20",
  cyan:
    "from-[#07536a] via-[#063c50] to-[#042a39] border-cyan-400/20",
};

const cardAccentStyles: Record<string, string> = {
  purple: "text-purple-200",
  green: "text-emerald-200",
  blue: "text-blue-200",
  red: "text-red-200",
  indigo: "text-indigo-200",
  cyan: "text-cyan-200",
};

const avatarStyles: Record<string, string> = {
  purple: "bg-purple-600",
  green: "bg-emerald-600",
  blue: "bg-blue-600",
  red: "bg-red-600",
  indigo: "bg-indigo-600",
  cyan: "bg-cyan-600",
};

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

const initialForm: FeedbackForm = {
  role: "",
  message: "",
  cardColor: "purple",
};

// ======================================================
// HELPERS
// ======================================================

function getUserName(user: User | null) {
  if (!user) {
    return "Guest";
  }

  return (
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Visitor"
  );
}

function getUserAvatar(user: User | null) {
  if (!user) {
    return null;
  }

  return (
    user.user_metadata?.avatar_url ??
    user.user_metadata?.picture ??
    null
  );
}

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();

    throw new Error(
      text.startsWith("<!DOCTYPE")
        ? "The feedback API route returned a webpage instead of JSON."
        : "The server returned an invalid response."
    );
  }

  return response.json();
}

// ======================================================
// COMPONENT
// ======================================================

export default function FeedbackWall() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [signInOpen, setSignInOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [form, setForm] = useState<FeedbackForm>(initialForm);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [loadingProvider, setLoadingProvider] =
    useState<OAuthProvider | null>(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [authError, setAuthError] = useState("");

  const user = session?.user ?? null;
  const signedIn = Boolean(user);

  // ======================================================
  // AUTH SESSION
  // ======================================================

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (active) {
        setSession(currentSession);
        setAuthLoading(false);
      }
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setAuthLoading(false);

        if (currentSession) {
          setSignInOpen(false);
        }
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // ======================================================
  // LOAD FEEDBACK
  // ======================================================

  const loadFeedback = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/feedback", {
        method: "GET",
        cache: "no-store",
      });

      const result = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to load feedback."
        );
      }

      setFeedback(result.feedback ?? []);
    } catch (error) {
      console.error("Feedback loading error:", error);

      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to load feedback right now."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFeedback();
  }, [loadFeedback]);

  // ======================================================
  // DATE FORMATTER
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
  // MODAL HANDLERS
  // ======================================================

  const openFeedbackFlow = () => {
    setStatusMessage("");
    setAuthError("");

    if (!signedIn) {
      setSignInOpen(true);
      return;
    }

    setFormOpen(true);
  };

  const closeSignInModal = () => {
    if (loadingProvider) {
      return;
    }

    setSignInOpen(false);
    setAuthError("");
  };

  // ======================================================
  // OAUTH
  // ======================================================

  const handleOAuthSignIn = async (
    provider: OAuthProvider
  ) => {
    try {
      setLoadingProvider(provider);
      setAuthError("");

      const redirectTo =
  `${window.location.origin}/auth/callback?next=${encodeURIComponent(
    "/#feedback"
  )}`;

      const { error } =
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo,
          },
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "Unable to begin sign-in."
      );

      setLoadingProvider(null);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setStatusMessage(error.message);
      return;
    }

    setSession(null);
    setFormOpen(false);
    setStatusMessage("You have been signed out.");
  };

  // ======================================================
  // FORM
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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!user) {
      setFormOpen(false);
      setSignInOpen(true);
      return;
    }

    setSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: getUserName(user),
          email: user.email,
          avatar_url: getUserAvatar(user),
          auth_user_id: user.id,
          role: form.role.trim(),
          message: form.message.trim(),
          cardColor: form.cardColor,
        }),
      });

      const result = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to submit feedback."
        );
      }

      setStatusMessage(
        "Your message was pinned to the approval queue."
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

  // ======================================================
  // UI
  // ======================================================

  return (
    <section
      id="feedback"
      className="relative overflow-hidden bg-[#080808] px-4 py-24 sm:px-6"
    >
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />

        <div className="absolute left-0 top-0 h-full w-12 border-r border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_5px)] sm:w-20" />

        <div className="absolute right-0 top-0 h-full w-12 border-l border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_5px)] sm:w-20" />
      </div>

      <div className="relative mx-auto max-w-[1460px] rounded-[2rem] border border-white/10 bg-[#0c0c0d]/95 px-4 py-12 shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:px-8 lg:px-14">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/45">
            Guestbook
          </p>

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Words That Echo{" "}
            <span className="font-serif italic text-white/80">
              Always
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
            A little corner of the internet where visitors can
            leave a note, share encouragement, and say hello.
          </p>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[292px] animate-pulse rounded-[1.6rem] border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {/* Join card */}
            <motion.article
              initial={{ opacity: 0, y: 28, rotate: -0.7 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -7, rotate: 0 }}
              viewport={{ once: true }}
              className="relative flex min-h-[292px] flex-col overflow-hidden rounded-[1.6rem] border border-purple-400/20 bg-gradient-to-br from-[#572181] via-[#451569] to-[#32104f] shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
            >
              <div className="pointer-events-none absolute inset-0 text-purple-200/30">
                <Sparkles className="absolute right-14 top-5 h-10 w-10" />
                <PenLine className="absolute bottom-24 left-10 h-11 w-11 -rotate-45" />
              </div>

              <div className="relative flex flex-1 flex-col items-center justify-center px-7 text-center">
                <p className="font-serif text-3xl italic text-white">
                  “Join the wall...”
                </p>

                <p className="mt-1 text-sm font-semibold text-purple-100">
                  {signedIn
                    ? `Signed in as ${getUserName(user)}`
                    : "Sign in to leave your mark"}
                </p>

                <motion.button
                  type="button"
                  onClick={openFeedbackFlow}
                  disabled={authLoading}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-5 inline-flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/15 disabled:opacity-50"
                >
                  <PenLine className="h-5 w-5" />
                  Write a message...
                </motion.button>
              </div>

              {/* Scalloped edge */}
              <div className="relative h-5 overflow-hidden">
                <div className="absolute -bottom-3 left-0 h-6 w-full bg-[radial-gradient(circle_at_12px_0,#171717_12px,transparent_13px)] bg-[size:32px_24px] bg-repeat-x" />
              </div>

              <div className="flex h-[58px] items-center justify-center gap-4 bg-[#171717]">
                {signedIn ? (
                  <>
                    {getUserAvatar(user) ? (
                      <img
                        src={getUserAvatar(user) ?? ""}
                        alt={getUserName(user)}
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full border border-white/15 object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                        {getUserName(user)
                          .slice(0, 1)
                          .toUpperCase()}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => void handleSignOut()}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 transition hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <img
  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
  alt="GitHub"
  className="h-6 w-6"
/>

                    <span className="h-5 w-px bg-white/15" />

                    <span className="text-lg font-bold text-white">
                      <span className="text-blue-400">G</span>
                    </span>
                  </>
                )}
              </div>
            </motion.article>

            {/* Existing feedback */}
            {feedback.map((item, index) => {
              const selectedStyle =
                cardStyles[item.card_color] ??
                cardStyles.purple;

              const selectedAccent =
                cardAccentStyles[item.card_color] ??
                cardAccentStyles.purple;

              const selectedAvatar =
                avatarStyles[item.card_color] ??
                avatarStyles.purple;

              return (
                <motion.article
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                    rotate: index % 2 === 0 ? 0.7 : -0.7,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    y: -8,
                    rotate: 0,
                    scale: 1.008,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.05, 0.25),
                  }}
                  className={`group relative flex min-h-[292px] flex-col overflow-hidden rounded-[1.6rem] border bg-gradient-to-br ${selectedStyle} shadow-[0_25px_70px_rgba(0,0,0,0.4)]`}
                >
                  {/* Decorations */}
                  <div
                    className={`pointer-events-none absolute inset-0 opacity-40 ${selectedAccent}`}
                  >
                    {index % 3 === 0 && (
                      <>
                        <Zap className="absolute left-8 top-7 h-12 w-12 -rotate-12" />
                        <div className="absolute bottom-20 right-8 flex h-16 w-16 items-center justify-center rounded-full border-2 border-current">
                          <span className="text-2xl">☺</span>
                        </div>
                      </>
                    )}

                    {index % 3 === 1 && (
                      <>
                        <Sparkles className="absolute right-10 top-7 h-10 w-10" />
                        <div className="absolute bottom-20 left-12 text-6xl font-light">
                          ♡
                        </div>
                      </>
                    )}

                    {index % 3 === 2 && (
                      <>
                        <div className="absolute right-10 top-5 text-6xl font-light">
                          〰
                        </div>
                        <PenLine className="absolute bottom-20 left-12 h-11 w-11 rotate-12" />
                      </>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative flex flex-1 items-center justify-center px-8 py-10 text-center">
                    <p className="max-w-md text-xl font-extrabold leading-snug tracking-tight text-white sm:text-2xl">
                      {item.message}
                    </p>
                  </div>

                  {/* Scalloped edge */}
                  <div className="relative h-5 overflow-hidden">
                    <div className="absolute -bottom-3 left-0 h-6 w-full bg-[radial-gradient(circle_at_12px_0,#171717_12px,transparent_13px)] bg-[size:32px_24px] bg-repeat-x" />
                  </div>

                  {/* Footer */}
                  <div className="relative flex h-[64px] items-center justify-between bg-[#171717] px-5">
                    <div className="flex min-w-0 items-center gap-3">
                      {item.avatar_url ? (
                        <img
                          src={item.avatar_url}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="h-9 w-9 shrink-0 rounded-full border border-white/20 object-cover"
                        />
                      ) : (
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-sm font-bold text-white ${selectedAvatar}`}
                        >
                          {item.name
                            .slice(0, 1)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold uppercase text-white">
                          {item.name}
                        </p>

                        <p className="truncate text-xs font-semibold text-white/55">
                          {item.role
                            ? `${item.role} · `
                            : ""}
                          {dateFormatter.format(
                            new Date(item.created_at)
                          )}
                        </p>
                      </div>
                    </div>

                    <Share2 className="h-4 w-4 text-white/35 transition group-hover:text-white/80" />
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {!loading && feedback.length === 0 && (
          <p className="mt-8 text-center text-sm text-white/40">
            No approved messages yet. Be the first to join the
            wall.
          </p>
        )}
      </div>

      {/* ==================================================
          SIGN-IN MODAL
      =================================================== */}

      <AnimatePresence>
        {signInOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) {
                closeSignInModal();
              }
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.94,
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
              className="w-full max-w-[480px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#171717] shadow-[0_30px_100px_rgba(0,0,0,0.75)]"
            >
              {/* Purple header */}
              <div className="relative bg-gradient-to-br from-[#5a2284] via-[#451667] to-[#34104f] px-7 pb-12 pt-7 text-center">
                <button
                  type="button"
                  onClick={closeSignInModal}
                  aria-label="Close sign-in modal"
                  className="absolute right-5 top-5 text-white/80 transition hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>

                <Sparkles className="absolute right-12 top-4 h-9 w-9 text-purple-200/30" />

                <div className="mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-3xl border border-white/10 bg-white/15 shadow-lg">
                  <PenLine className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-5 font-serif text-3xl italic text-white">
                  Leave your mark
                </h3>

                <p className="mt-2 font-semibold text-purple-100/70">
                  Sign in to pin a note on the wall
                </p>

                <PenLine className="absolute bottom-5 left-9 h-10 w-10 -rotate-45 text-purple-200/20" />
              </div>

              {/* Scalloped separator */}
              <div className="relative h-5 overflow-hidden bg-[#171717]">
                <div className="absolute -top-3 left-0 h-6 w-full bg-[radial-gradient(circle_at_12px_24px,#451667_12px,transparent_13px)] bg-[size:32px_24px] bg-repeat-x" />
              </div>

              {/* Buttons */}
              <div className="px-7 pb-9 pt-3">
                <div className="grid gap-4">
                  <button
                    type="button"
                    disabled={loadingProvider !== null}
                    onClick={() =>
                      void handleOAuthSignIn("github")
                    }
                    className="flex w-full items-center justify-center gap-4 rounded-2xl bg-white px-5 py-4 text-lg font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                   {loadingProvider === "github" ? (
  <LoaderCircle className="h-6 w-6 animate-spin" />
) : (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-6 w-6 fill-current"
  >
    <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.03c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.3-.52-1.5.11-3.07 0 0 .97-.31 3.17 1.19a10.98 10.98 0 0 1 5.78 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.23 2.77.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.08.79 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
)}

                    Continue with GitHub
                  </button>

                  <button
                    type="button"
                    disabled={loadingProvider !== null}
                    onClick={() =>
                      void handleOAuthSignIn("google")
                    }
                    className="flex w-full items-center justify-center gap-4 rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingProvider === "google" ? (
                      <LoaderCircle className="h-6 w-6 animate-spin" />
                    ) : (
                      <span className="text-2xl font-extrabold">
                        <span className="text-blue-400">G</span>
                      </span>
                    )}

                    Continue with Google
                  </button>
                </div>

                {authError && (
                  <p className="mt-4 rounded-xl border border-red-500/20 bg-red-950/30 p-3 text-center text-sm text-red-300">
                    {authError}
                  </p>
                )}

                <p className="mt-6 text-center text-sm text-white/40">
                  We only access your name and avatar
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================
          FEEDBACK FORM MODAL
      =================================================== */}

      <AnimatePresence>
        {formOpen && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) {
                setFormOpen(false);
              }
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
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
              className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[1.8rem] border border-white/10 bg-[#151515] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.75)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
                    Guestbook
                  </p>

                  <h3 className="mt-2 font-serif text-3xl italic text-white">
                    Pin your note
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close feedback form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* User */}
              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  {getUserAvatar(user) ? (
                    <img
                      src={getUserAvatar(user) ?? ""}
                      alt={getUserName(user)}
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 font-bold text-white">
                      {getUserName(user)
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      {getUserName(user)}
                    </p>

                    <p className="truncate text-xs text-white/40">
                      {user.email}
                    </p>
                  </div>
                </div>

                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-6 grid gap-5"
              >
                <div>
                  <label
                    htmlFor="feedback-role"
                    className="mb-2 block text-sm text-white/60"
                  >
                    Role or company
                  </label>

                  <input
                    id="feedback-role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    maxLength={80}
                    placeholder="Developer, recruiter, designer..."
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/50"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="feedback-message"
                      className="text-sm text-white/60"
                    >
                      Your message
                    </label>

                    <span className="text-xs text-white/30">
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
                    placeholder="Write something memorable..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-purple-400/50"
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm text-white/60">
                    Choose your card
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
                          className={`h-10 w-10 rounded-full border-2 transition ${
                            option.className
                          } ${
                            selected
                              ? "scale-110 border-white"
                              : "border-transparent opacity-65 hover:scale-105 hover:opacity-100"
                          }`}
                          aria-label={`Use ${option.label} card`}
                        />
                      );
                    })}
                  </div>
                </div>

                {statusMessage && (
                  <div className="flex items-start gap-2 rounded-2xl border border-purple-400/20 bg-purple-950/30 p-4 text-sm text-purple-100">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>{statusMessage}</p>
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={
                    submitting || !form.message.trim()
                  }
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
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-bold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Pinning message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Pin message to the wall
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}