"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CalendarDays,
  CheckCircle2,
  LoaderCircle,
  Plus,
  Quote,
  RefreshCw,
  Save,
  Search,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";

import { useAdmin } from "@/components/admin/AdminProvider";

type QuoteStatus = "draft" | "published";

type PortfolioQuote = {
  id: string;
  quote: string;
  author: string | null;
  source: string | null;
  status: QuoteStatus;
  featured: boolean;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
};

type QuoteForm = {
  quote: string;
  author: string;
  source: string;
  status: QuoteStatus;
  featured: boolean;
  publishDate: string;
};

const initialForm: QuoteForm = {
  quote: "",
  author: "",
  source: "",
  status: "draft",
  featured: false,
  publishDate: "",
};

async function readJson(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error("The server returned an invalid response.");
  }

  return response.json();
}

export default function AdminQuotesPage() {
  const { adminFetch } = useAdmin();

  const [quotes, setQuotes] = useState<PortfolioQuote[]>([]);
  const [form, setForm] = useState<QuoteForm>(initialForm);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const loadQuotes = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await adminFetch("/api/admin/quotes");
      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to load quotes."
        );
      }

      setQuotes(result.quotes ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load quotes."
      );
    } finally {
      setLoading(false);
    }
  }, [adminFetch]);

  useEffect(() => {
    void loadQuotes();
  }, [loadQuotes]);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setErrorMessage("");
  };

  const editQuote = (item: PortfolioQuote) => {
    setEditingId(item.id);

    setForm({
      quote: item.quote,
      author: item.author ?? "",
      source: item.source ?? "",
      status: item.status,
      featured: item.featured,
      publishDate: item.publish_date ?? "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const saveQuote = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        "/api/admin/quotes",
        {
          method: editingId ? "PATCH" : "POST",
          body: JSON.stringify({
            ...(editingId
              ? {
                  id: editingId,
                }
              : {}),
            quote: form.quote.trim(),
            author: form.author.trim(),
            source: form.source.trim(),
            status: form.status,
            featured: form.featured,
            publishDate: form.publishDate || null,
          }),
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to save quote."
        );
      }

      setStatusMessage(
        result.message ??
          (editingId
            ? "Quote updated."
            : "Quote created.")
      );

      resetForm();
      await loadQuotes();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to save quote."
      );
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (
    item: PortfolioQuote,
    status: QuoteStatus
  ) => {
    try {
      setActionId(item.id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        "/api/admin/quotes",
        {
          method: "PATCH",
          body: JSON.stringify({
            id: item.id,
            quote: item.quote,
            author: item.author,
            source: item.source,
            status,
            featured: item.featured,
            publishDate: item.publish_date,
          }),
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to update quote."
        );
      }

      setQuotes((current) =>
        current.map((quoteItem) =>
          quoteItem.id === item.id
            ? {
                ...quoteItem,
                status,
              }
            : quoteItem
        )
      );

      setStatusMessage(result.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update quote."
      );
    } finally {
      setActionId(null);
    }
  };

  const deleteQuote = async (
    item: PortfolioQuote
  ) => {
    const confirmed = window.confirm(
      `Delete this quote by ${item.author ?? "Unknown"}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(item.id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        `/api/admin/quotes?id=${encodeURIComponent(
          item.id
        )}`,
        {
          method: "DELETE",
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to delete quote."
        );
      }

      setQuotes((current) =>
        current.filter(
          (quoteItem) =>
            quoteItem.id !== item.id
        )
      );

      if (editingId === item.id) {
        resetForm();
      }

      setStatusMessage(result.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete quote."
      );
    } finally {
      setActionId(null);
    }
  };

  const visibleQuotes = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    if (!normalizedSearch) {
      return quotes;
    }

    return quotes.filter((item) =>
      [
        item.quote,
        item.author ?? "",
        item.source ?? "",
        item.status,
      ].some((value) =>
        value
          .toLowerCase()
          .includes(normalizedSearch)
      )
    );
  }, [quotes, search]);

  const counts = useMemo(
    () => ({
      all: quotes.length,
      drafts: quotes.filter(
        (item) => item.status === "draft"
      ).length,
      published: quotes.filter(
        (item) => item.status === "published"
      ).length,
    }),
    [quotes]
  );

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-3">
              <Quote className="h-6 w-6 text-purple-300" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
                Portfolio CMS
              </p>
            </div>

            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Daily quotes
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Create, schedule, publish, edit, and delete
              portfolio quotes.
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.06]"
          >
            <Plus className="h-4 w-4" />
            New quote
          </button>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard label="All quotes" value={counts.all} />
          <StatCard label="Drafts" value={counts.drafts} />
          <StatCard
            label="Published"
            value={counts.published}
          />
        </section>

        {(errorMessage || statusMessage) && (
          <div className="mt-6 grid gap-3">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-sm text-red-300">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {errorMessage}
              </div>
            )}

            {statusMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-sm text-emerald-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                {statusMessage}
              </div>
            )}
          </div>
        )}

        <section className="mt-8 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <form
            onSubmit={saveQuote}
            className="rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 sm:p-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
              {editingId ? "Editing quote" : "New quote"}
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {editingId
                ? "Update quote"
                : "Create quote"}
            </h2>

            <div className="mt-6 grid gap-5">
              <Field label="Quote">
                <textarea
                  value={form.quote}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      quote: event.target.value,
                    }))
                  }
                  rows={6}
                  required
                  maxLength={500}
                  placeholder="Write an inspiring quote..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-purple-400/50"
                />
              </Field>

              <Field label="Author">
                <input
                  value={form.author}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      author: event.target.value,
                    }))
                  }
                  placeholder="Author name"
                  className="input-style"
                />
              </Field>

              <Field label="Source">
                <input
                  value={form.source}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      source: event.target.value,
                    }))
                  }
                  placeholder="Book, speech, website..."
                  className="input-style"
                />
              </Field>

              <Field label="Publish date">
                <input
                  type="date"
                  value={form.publishDate}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      publishDate: event.target.value,
                    }))
                  }
                  className="input-style"
                />
              </Field>

              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status:
                        event.target.value as QuoteStatus,
                    }))
                  }
                  className="input-style"
                >
                  <option value="draft">Draft</option>
                  <option value="published">
                    Published
                  </option>
                </select>
              </Field>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      featured: event.target.checked,
                    }))
                  }
                />

                <Star className="h-4 w-4 text-amber-300" />
                Feature this quote
              </label>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}

                {editingId
                  ? "Update quote"
                  : form.status === "published"
                    ? "Publish quote"
                    : "Save draft"}
              </button>
            </div>
          </form>

          <section className="rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
                  Quote library
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Existing quotes
                </h2>
              </div>

              <div className="flex gap-2">
                <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3">
                  <Search className="h-4 w-4 text-white/35" />

                  <input
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search..."
                    className="w-36 bg-transparent py-2.5 text-sm outline-none placeholder:text-white/25"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => void loadQuotes()}
                  disabled={loading}
                  className="rounded-xl border border-white/10 p-3 text-white/55 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${
                      loading ? "animate-spin" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {loading ? (
                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-44 animate-pulse rounded-2xl bg-white/[0.04]"
                  />
                ))
              ) : visibleQuotes.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
                  <Quote className="mx-auto h-10 w-10 text-white/20" />

                  <h3 className="mt-4 font-semibold">
                    No quotes found
                  </h3>
                </div>
              ) : (
                visibleQuotes.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          item.status === "published"
                            ? "bg-emerald-950/40 text-emerald-300"
                            : "bg-amber-950/40 text-amber-300"
                        }`}
                      >
                        {item.status}
                      </span>

                      {item.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-purple-950/40 px-2.5 py-1 text-xs text-purple-300">
                          <Star className="h-3 w-3" />
                          Featured
                        </span>
                      )}

                      {item.publish_date && (
                        <span className="inline-flex items-center gap-1 text-xs text-white/35">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {item.publish_date}
                        </span>
                      )}
                    </div>

                    <blockquote className="mt-4 text-lg leading-8 text-white/80">
                      “{item.quote}”
                    </blockquote>

                    <p className="mt-3 text-sm text-white/40">
                      — {item.author ?? "Unknown"}
                      {item.source
                        ? `, ${item.source}`
                        : ""}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => editQuote(item)}
                        className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/65 transition hover:bg-white/[0.06]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={actionId === item.id}
                        onClick={() =>
                          void updateStatus(
                            item,
                            item.status === "published"
                              ? "draft"
                              : "published"
                          )
                        }
                        className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300 transition hover:bg-emerald-950/40 disabled:opacity-50"
                      >
                        {item.status === "published"
                          ? "Move to draft"
                          : "Publish"}
                      </button>

                      <button
                        type="button"
                        disabled={actionId === item.id}
                        onClick={() =>
                          void deleteQuote(item)
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-3 py-2 text-sm text-red-300 transition hover:bg-red-950/40 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </section>
      </div>

      <style jsx>{`
        .input-style {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.035);
          padding: 0.8rem 1rem;
          color: white;
          outline: none;
        }

        .input-style:focus {
          border-color: rgba(192, 132, 252, 0.5);
        }

        .input-style::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </main>
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

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#101010] p-5">
      <p className="text-sm text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-semibold">{value}</p>
    </div>
  );
}