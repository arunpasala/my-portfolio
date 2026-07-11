"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Check,
  CheckCircle2,
  LoaderCircle,
  MessageSquareQuote,
  RefreshCw,
  Search,
  Trash2,
  Undo2,
  XCircle,
} from "lucide-react";

import { useAdmin } from "@/components/admin/AdminProvider";

type TestimonialStatus =
  | "pending"
  | "approved";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  email: string | null;
  avatar_url: string | null;
  title: string;
  message: string;
  card_color: string;
  status: TestimonialStatus;
  created_at: string;
};

type Filter =
  | "all"
  | "pending"
  | "approved";

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

export default function AdminTestimonialsPage() {
  const { adminFetch } = useAdmin();

  const [testimonials, setTestimonials] =
    useState<Testimonial[]>([]);

  const [filter, setFilter] =
    useState<Filter>("pending");

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [actionId, setActionId] =
    useState<string | null>(null);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [statusMessage, setStatusMessage] =
    useState("");

  const loadTestimonials =
    useCallback(async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await adminFetch(
          "/api/admin/testimonials"
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
    }, [adminFetch]);

  useEffect(() => {
    void loadTestimonials();
  }, [loadTestimonials]);

  const updateStatus = async (
    id: string,
    status: TestimonialStatus
  ) => {
    try {
      setActionId(id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        "/api/admin/testimonials",
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
            "Unable to update testimonial."
        );
      }

      setTestimonials((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setStatusMessage(result.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update testimonial."
      );
    } finally {
      setActionId(null);
    }
  };

  const deleteTestimonial = async (
    item: Testimonial
  ) => {
    const confirmed = window.confirm(
      `Delete testimonial from ${item.name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(item.id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        `/api/admin/testimonials?id=${encodeURIComponent(
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
            "Unable to delete testimonial."
        );
      }

      setTestimonials((current) =>
        current.filter(
          (testimonial) =>
            testimonial.id !== item.id
        )
      );

      setStatusMessage(result.message);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete testimonial."
      );
    } finally {
      setActionId(null);
    }
  };

  const counts = useMemo(
    () => ({
      all: testimonials.length,

      pending: testimonials.filter(
        (item) =>
          item.status === "pending"
      ).length,

      approved: testimonials.filter(
        (item) =>
          item.status === "approved"
      ).length,
    }),
    [testimonials]
  );

  const visibleTestimonials = useMemo(() => {
    const normalized =
      search.trim().toLowerCase();

    return testimonials.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        item.status === filter;

      const matchesSearch =
        !normalized ||
        [
          item.name,
          item.role ?? "",
          item.company ?? "",
          item.email ?? "",
          item.title,
          item.message,
        ].some((value) =>
          value
            .toLowerCase()
            .includes(normalized)
        );

      return matchesFilter && matchesSearch;
    });
  }, [filter, search, testimonials]);

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <MessageSquareQuote className="h-6 w-6 text-purple-300" />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
              Portfolio CMS
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Testimonials
          </h1>

          <p className="mt-2 text-sm text-white/45">
            Review, approve, move to pending, or
            delete submitted testimonials.
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="All testimonials"
            value={counts.all}
          />

          <StatCard
            label="Pending"
            value={counts.pending}
          />

          <StatCard
            label="Approved"
            value={counts.approved}
          />
        </section>

        <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "pending",
                  "approved",
                  "all",
                ] as Filter[]
              ).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setFilter(item)
                  }
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${
                    filter === item
                      ? "bg-white text-black"
                      : "border border-white/10 text-white/55 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item}

                  <span className="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs">
                    {counts[item]}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3">
                <Search className="h-4 w-4 text-white/35" />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search..."
                  className="bg-transparent py-2.5 text-sm outline-none placeholder:text-white/25"
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  void loadTestimonials()
                }
                disabled={loading}
                className="rounded-xl border border-white/10 p-3 text-white/55 hover:bg-white/[0.06]"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {(errorMessage ||
            statusMessage) && (
            <div className="mt-5 grid gap-3">
              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-sm text-red-300">
                  <XCircle className="h-4 w-4" />
                  {errorMessage}
                </div>
              )}

              {statusMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-sm text-emerald-300">
                  <CheckCircle2 className="h-4 w-4" />
                  {statusMessage}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 grid gap-4">
            {loading ? (
              [1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-52 animate-pulse rounded-2xl bg-white/[0.04]"
                />
              ))
            ) : visibleTestimonials.length ===
              0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
                <MessageSquareQuote className="mx-auto h-10 w-10 text-white/20" />

                <h2 className="mt-4 font-semibold">
                  No testimonials found
                </h2>
              </div>
            ) : (
              visibleTestimonials.map(
                (item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold">
                            {item.name}
                          </h2>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs capitalize ${
                              item.status ===
                              "approved"
                                ? "bg-emerald-950/40 text-emerald-300"
                                : "bg-amber-950/40 text-amber-300"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-white/35">
                          {[
                            item.role,
                            item.company,
                            item.email,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {item.status ===
                        "approved" ? (
                          <button
                            type="button"
                            disabled={
                              actionId === item.id
                            }
                            onClick={() =>
                              void updateStatus(
                                item.id,
                                "pending"
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-950/20 px-3 py-2 text-sm text-amber-300"
                          >
                            <Undo2 className="h-4 w-4" />
                            Move to pending
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled={
                              actionId === item.id
                            }
                            onClick={() =>
                              void updateStatus(
                                item.id,
                                "approved"
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/20 px-3 py-2 text-sm text-emerald-300"
                          >
                            {actionId ===
                            item.id ? (
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                            ) : (
                              <Check className="h-4 w-4" />
                            )}

                            Approve
                          </button>
                        )}

                        <button
                          type="button"
                          disabled={
                            actionId === item.id
                          }
                          onClick={() =>
                            void deleteTestimonial(
                              item
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-3 py-2 text-sm text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>

                    <h3 className="mt-5 text-xl font-semibold">
                      {item.title}
                    </h3>

                    <blockquote className="mt-3 rounded-xl border border-white/10 bg-black/20 p-4 leading-7 text-white/65">
                      “{item.message}”
                    </blockquote>
                  </article>
                )
              )
            )}
          </div>
        </section>
      </div>
    </main>
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
      <p className="text-sm text-white/45">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}