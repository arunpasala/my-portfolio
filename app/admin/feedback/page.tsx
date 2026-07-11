"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";
import type { Session } from "@supabase/supabase-js";
import {
  Check,
  CheckCircle2,
  Clock3,
  ExternalLink,
  LoaderCircle,
  LogOut,
  MessageSquareText,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Undo2,
  XCircle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

// ======================================================
// TYPES
// ======================================================

type FeedbackStatus = "pending" | "approved";

type Feedback = {
  id: string;
  name: string;
  email: string | null;
  role: string | null;
  message: string;
  avatar_url: string | null;
  card_color: string;
  status: FeedbackStatus;
  created_at: string;
};

type FeedbackFilter =
  | "all"
  | "pending"
  | "approved";

type OAuthProvider = "google" | "github";

// ======================================================
// CARD DOT COLORS
// ======================================================

const colorDotStyles: Record<string, string> = {
  purple: "bg-purple-600",
  green: "bg-emerald-600",
  blue: "bg-blue-600",
  red: "bg-red-600",
  indigo: "bg-indigo-600",
  cyan: "bg-cyan-600",
};

// ======================================================
// SESSION HELPERS
// ======================================================

function getDisplayName(session: Session | null) {
  const user = session?.user;

  return (
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Administrator"
  );
}

function getAvatar(session: Session | null) {
  const user = session?.user;

  return (
    user?.user_metadata?.avatar_url ??
    user?.user_metadata?.picture ??
    null
  );
}

async function readJson(response: Response) {
  const contentType =
    response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await response.text();

    throw new Error(
      text.startsWith("<!DOCTYPE")
        ? "The server returned a webpage instead of JSON."
        : "The server returned an invalid response."
    );
  }

  return response.json();
}

// ======================================================
// ADMIN PAGE
// ======================================================

export default function AdminFeedbackPage() {
  const [session, setSession] =
    useState<Session | null>(null);

  const [sessionLoading, setSessionLoading] =
    useState(true);

  const [feedback, setFeedback] = useState<
    Feedback[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [actionId, setActionId] = useState<
    string | null
  >(null);

  const [loadingProvider, setLoadingProvider] =
    useState<OAuthProvider | null>(null);

  const [filter, setFilter] =
    useState<FeedbackFilter>("pending");

  const [search, setSearch] = useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [statusMessage, setStatusMessage] =
    useState("");

  const accessToken =
    session?.access_token ?? null;

  // ======================================================
  // LOAD SESSION
  // ======================================================

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (active) {
        setSession(currentSession);
        setSessionLoading(false);
      }
    };

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, currentSession) => {
        setSession(currentSession);
        setSessionLoading(false);
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // ======================================================
  // AUTHENTICATED ADMIN REQUEST
  // ======================================================

  const adminFetch = useCallback(
    async (
      input: RequestInfo | URL,
      init?: RequestInit
    ) => {
      if (!accessToken) {
        throw new Error(
          "You must sign in before accessing the admin panel."
        );
      }

      const headers = new Headers(init?.headers);

      headers.set(
        "Authorization",
        `Bearer ${accessToken}`
      );

      if (
        init?.body &&
        !headers.has("Content-Type")
      ) {
        headers.set(
          "Content-Type",
          "application/json"
        );
      }

      return fetch(input, {
        ...init,
        headers,
        cache: "no-store",
      });
    },
    [accessToken]
  );

  // ======================================================
  // LOAD ALL FEEDBACK
  // ======================================================

  const loadFeedback = useCallback(async () => {
    if (!accessToken) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await adminFetch(
        "/api/admin/feedback"
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to load feedback."
        );
      }

      setFeedback(result.feedback ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load feedback."
      );
    } finally {
      setLoading(false);
    }
  }, [accessToken, adminFetch]);

  useEffect(() => {
    void loadFeedback();
  }, [loadFeedback]);

  // ======================================================
  // SIGN IN
  // ======================================================

  const handleSignIn = async (
    provider: OAuthProvider
  ) => {
    try {
      setLoadingProvider(provider);
      setErrorMessage("");

      const redirectTo =
        `${window.location.origin}/auth/callback` +
        `?next=${encodeURIComponent(
          "/admin/feedback"
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
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      );

      setLoadingProvider(null);
    }
  };

  // ======================================================
  // SIGN OUT
  // ======================================================

  const handleSignOut = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSession(null);
    setFeedback([]);
  };

  // ======================================================
  // UPDATE STATUS
  // ======================================================

  const updateStatus = async (
    id: string,
    status: FeedbackStatus
  ) => {
    try {
      setActionId(id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        "/api/admin/feedback",
        {
          method: "PATCH",
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to update feedback."
        );
      }

      setFeedback((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setStatusMessage(
        result.message ??
          (status === "approved"
            ? "Feedback approved."
            : "Feedback moved to pending.")
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update feedback."
      );
    } finally {
      setActionId(null);
    }
  };

  // ======================================================
  // DELETE FEEDBACK
  // ======================================================

  const deleteFeedback = async (
    item: Feedback
  ) => {
    const confirmed = window.confirm(
      `Delete feedback from ${item.name}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(item.id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        `/api/admin/feedback?id=${encodeURIComponent(
          item.id
        )}`,
        {
          method: "DELETE",
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to delete feedback."
        );
      }

      setFeedback((current) =>
        current.filter(
          (feedbackItem) =>
            feedbackItem.id !== item.id
        )
      );

      setStatusMessage(
        result.message ?? "Feedback deleted."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete feedback."
      );
    } finally {
      setActionId(null);
    }
  };

  // ======================================================
  // COUNTS
  // ======================================================

  const counts = useMemo(() => {
    return {
      all: feedback.length,

      pending: feedback.filter(
        (item) => item.status === "pending"
      ).length,

      approved: feedback.filter(
        (item) => item.status === "approved"
      ).length,
    };
  }, [feedback]);

  // ======================================================
  // FILTERED FEEDBACK
  // ======================================================

  const visibleFeedback = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return feedback.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "pending" &&
          item.status === "pending") ||
        (filter === "approved" &&
          item.status === "approved");

      if (!matchesFilter) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return [
        item.name,
        item.email ?? "",
        item.role ?? "",
        item.message,
        item.status,
      ].some((value) =>
        value
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [feedback, filter, search]);

  // ======================================================
  // DATE FORMAT
  // ======================================================

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    []
  );

  // ======================================================
  // SESSION LOADING SCREEN
  // ======================================================

  if (sessionLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        <div className="flex items-center gap-3 text-white/60">
          <LoaderCircle className="h-5 w-5 animate-spin" />
          Checking admin session...
        </div>
      </main>
    );
  }

  // ======================================================
  // ADMIN SIGN-IN SCREEN
  // ======================================================

  if (!session) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070707] px-5 py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-purple-700/20 blur-3xl" />

          <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-cyan-700/10 blur-3xl" />
        </div>

        <motion.section
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111]/95 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-950/60">
            <ShieldCheck className="h-8 w-8 text-purple-300" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
              Portfolio Admin
            </p>

            <h1 className="mt-3 text-3xl font-semibold">
              Feedback moderation
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/45">
              Sign in using the account configured as
              your portfolio administrator.
            </p>
          </div>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              disabled={loadingProvider !== null}
              onClick={() =>
                void handleSignIn("google")
              }
              className="flex items-center justify-center gap-3 rounded-2xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingProvider === "google" ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <span className="text-xl font-bold text-blue-500">
                  G
                </span>
              )}

              Continue with Google
            </button>

            <button
              type="button"
              disabled={loadingProvider !== null}
              onClick={() =>
                void handleSignIn("github")
              }
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3.5 font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingProvider === "github" ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <GitHubLogo className="h-5 w-5" />
              )}

              Continue with GitHub
            </button>
          </div>

          {errorMessage && (
            <p className="mt-4 rounded-xl border border-red-500/20 bg-red-950/30 p-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <a
            href="/#feedback"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40 transition hover:text-white"
          >
            Return to portfolio
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.section>
      </main>
    );
  }

  // ======================================================
  // ADMIN DASHBOARD
  // ======================================================

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-purple-300" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
                Portfolio Admin
              </p>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Feedback moderation
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Review visitor messages before they appear
              on your public feedback wall.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/#feedback"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white"
            >
              View portfolio
              <ExternalLink className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() =>
                void handleSignOut()
              }
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-2.5 text-sm text-red-300 transition hover:bg-red-950/40"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </header>

        {/* Statistics */}
        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="All messages"
            value={counts.all}
            icon={
              <MessageSquareText className="h-5 w-5" />
            }
          />

          <StatCard
            label="Pending"
            value={counts.pending}
            icon={
              <Clock3 className="h-5 w-5" />
            }
          />

          <StatCard
            label="Approved"
            value={counts.approved}
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
          />
        </section>

        {/* Feedback panel */}
        <section className="mt-8 rounded-[1.7rem] border border-white/10 bg-[#101010] p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="Pending"
                count={counts.pending}
                active={filter === "pending"}
                onClick={() =>
                  setFilter("pending")
                }
              />

              <FilterButton
                label="Approved"
                count={counts.approved}
                active={filter === "approved"}
                onClick={() =>
                  setFilter("approved")
                }
              />

              <FilterButton
                label="All"
                count={counts.all}
                active={filter === "all"}
                onClick={() => setFilter("all")}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="flex min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3">
                <Search className="h-4 w-4 shrink-0 text-white/35" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search feedback..."
                  className="min-w-0 bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  void loadFeedback()
                }
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh
              </button>
            </div>
          </div>

          {/* Messages */}
          {(errorMessage || statusMessage) && (
            <div className="mt-5 grid gap-3">
              {errorMessage && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-sm text-red-300">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {statusMessage && (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/25 p-4 text-sm text-emerald-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{statusMessage}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback list */}
          <div className="mt-6">
            {loading ? (
              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                  />
                ))}
              </div>
            ) : visibleFeedback.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
                <MessageSquareText className="mx-auto h-10 w-10 text-white/25" />

                <h2 className="mt-4 text-lg font-semibold">
                  No feedback found
                </h2>

                <p className="mt-2 text-sm text-white/40">
                  There are no messages matching
                  the current filter.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {visibleFeedback.map((item) => (
                  <FeedbackRow
                    key={item.id}
                    item={item}
                    busy={actionId === item.id}
                    formattedDate={dateFormatter.format(
                      new Date(item.created_at)
                    )}
                    onApprove={() =>
                      void updateStatus(
                        item.id,
                        "approved"
                      )
                    }
                    onMoveToPending={() =>
                      void updateStatus(
                        item.id,
                        "pending"
                      )
                    }
                    onDelete={() =>
                      void deleteFeedback(item)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Signed-in user */}
        <footer className="mt-8 flex items-center gap-3 text-sm text-white/35">
          {getAvatar(session) ? (
            <img
              src={getAvatar(session) ?? ""}
              alt={getDisplayName(session)}
              referrerPolicy="no-referrer"
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
              {getDisplayName(session)
                .slice(0, 1)
                .toUpperCase()}
            </div>
          )}

          Signed in as {getDisplayName(session)}
        </footer>
      </div>
    </main>
  );
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/45">
          {label}
        </p>

        <div className="text-purple-300">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}

// ======================================================
// FILTER BUTTON
// ======================================================

function FilterButton({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-white text-black"
          : "border border-white/10 text-white/55 hover:bg-white/[0.06] hover:text-white"
      }`}
    >
      {label}

      <span
        className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
          active
            ? "bg-black/10"
            : "bg-white/[0.06]"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

// ======================================================
// FEEDBACK ROW
// ======================================================

function FeedbackRow({
  item,
  busy,
  formattedDate,
  onApprove,
  onMoveToPending,
  onDelete,
}: {
  item: Feedback;
  busy: boolean;
  formattedDate: string;
  onApprove: () => void;
  onMoveToPending: () => void;
  onDelete: () => void;
}) {
  const approved =
    item.status === "approved";

  const colorDotClass =
    colorDotStyles[item.card_color] ??
    colorDotStyles.purple;

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
    >
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex min-w-0 gap-4">
          {item.avatar_url ? (
            <img
              src={item.avatar_url}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-700 font-bold">
              {item.name
                .slice(0, 1)
                .toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-semibold">
                {item.name}
              </h2>

              <span
                className={`rounded-full border px-2 py-0.5 text-xs ${
                  approved
                    ? "border-emerald-500/20 bg-emerald-950/30 text-emerald-300"
                    : "border-amber-500/20 bg-amber-950/30 text-amber-300"
                }`}
              >
                {approved
                  ? "Approved"
                  : "Pending"}
              </span>
            </div>

            <p className="mt-1 break-all text-xs text-white/35">
              {item.email ??
                "No email available"}
            </p>

            <p className="mt-1 text-xs text-white/35">
              {item.role
                ? `${item.role} · `
                : ""}
              {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {approved ? (
            <button
              type="button"
              disabled={busy}
              onClick={onMoveToPending}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-950/20 px-3 py-2 text-sm text-amber-300 transition hover:bg-amber-950/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Undo2 className="h-4 w-4" />
              )}

              Move to pending
            </button>
          ) : (
            <button
              type="button"
              disabled={busy}
              onClick={onApprove}
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300 transition hover:bg-emerald-950/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}

              Approve
            </button>
          )}

          <button
            type="button"
            disabled={busy}
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-3 py-2 text-sm text-red-300 transition hover:bg-red-950/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <blockquote className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75 sm:text-base">
        “{item.message}”
      </blockquote>

      <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
        <span
          className={`h-3 w-3 rounded-full ${colorDotClass}`}
        />

        Card theme: {item.card_color}
      </div>
    </motion.article>
  );
}

// ======================================================
// GITHUB SVG
// ======================================================

function GitHubLogo({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`fill-current ${className}`}
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.03c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.29-5.27-5.73 0-1.27.45-2.3 1.19-3.11-.12-.3-.52-1.5.11-3.07 0 0 .97-.31 3.17 1.19a10.98 10.98 0 0 1 5.78 0c2.2-1.5 3.17-1.19 3.17-1.19.63 1.57.23 2.77.11 3.07.74.81 1.19 1.84 1.19 3.11 0 4.45-2.71 5.43-5.29 5.72.42.36.79 1.08.79 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}