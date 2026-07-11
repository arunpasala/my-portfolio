"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import {
  BookOpenText,
  ExternalLink,
  LoaderCircle,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

type BlogStatus = "draft" | "published";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  status: BlogStatus;
  featured: boolean;
  author_name: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  category: string;
  tags: string;
  status: BlogStatus;
  featured: boolean;
};

const initialForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  category: "",
  tags: "",
  status: "draft",
  featured: false,
};

async function readJson(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error("The server returned an invalid response.");
  }

  return response.json();
}

function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminBlogsPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<BlogForm>(initialForm);

  const [sessionLoading, setSessionLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const accessToken = session?.access_token ?? null;

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
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setSessionLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const adminFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!accessToken) {
        throw new Error("You must sign in as admin.");
      }

      const headers = new Headers(init?.headers);

      headers.set("Authorization", `Bearer ${accessToken}`);

      if (init?.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }

      return fetch(input, {
        ...init,
        headers,
        cache: "no-store",
      });
    },
    [accessToken]
  );

  const loadBlogs = useCallback(async () => {
    if (!accessToken) return;

    try {
      setLoading(true);
      setErrorMessage("");

      const response = await adminFetch("/api/admin/blogs");
      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to load blogs.");
      }

      setBlogs(result.blogs ?? []);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to load blogs."
      );
    } finally {
      setLoading(false);
    }
  }, [accessToken, adminFetch]);

  useEffect(() => {
    void loadBlogs();
  }, [loadBlogs]);

  const resetForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setErrorMessage("");
    setStatusMessage("");
  };

  const editBlog = (blog: Blog) => {
    setEditingId(blog.id);

    setForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt ?? "",
      content: blog.content,
      coverImageUrl: blog.cover_image_url ?? "",
      category: blog.category ?? "",
      tags: (blog.tags ?? []).join(", "),
      status: blog.status,
      featured: blog.featured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const saveBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setErrorMessage("");
      setStatusMessage("");

      const payload = {
        ...(editingId ? { id: editingId } : {}),
        title: form.title.trim(),
        slug: form.slug.trim() || createSlug(form.title),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        coverImageUrl: form.coverImageUrl.trim(),
        category: form.category.trim(),
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: form.status,
        featured: form.featured,
      };

      const response = await adminFetch("/api/admin/blogs", {
        method: editingId ? "PATCH" : "POST",
        body: JSON.stringify(payload),
      });

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to save blog.");
      }

      setStatusMessage(
        result.message ??
          (editingId ? "Blog updated." : "Blog created.")
      );

      resetForm();
      await loadBlogs();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save blog."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteBlog = async (blog: Blog) => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(blog.id);
      setErrorMessage("");
      setStatusMessage("");

      const response = await adminFetch(
        `/api/admin/blogs?id=${encodeURIComponent(blog.id)}`,
        {
          method: "DELETE",
        }
      );

      const result = await readJson(response);

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to delete blog.");
      }

      setBlogs((current) =>
        current.filter((item) => item.id !== blog.id)
      );

      if (editingId === blog.id) {
        resetForm();
      }

      setStatusMessage(result.message ?? "Blog deleted.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to delete blog."
      );
    } finally {
      setDeletingId(null);
    }
  };

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

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-6 text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-[#101010] p-8 text-center">
          <BookOpenText className="mx-auto h-10 w-10 text-cyan-300" />

          <h1 className="mt-5 text-2xl font-semibold">
            Admin login required
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/45">
            Open the feedback admin page and sign in first.
          </p>

          <Link
            href="/admin/feedback"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-black"
          >
            Go to admin login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070707] px-5 py-8 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Portfolio CMS
            </p>

            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Blog management
            </h1>

            <p className="mt-2 text-sm text-white/45">
              Create drafts, publish articles, and edit existing posts.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/70 hover:bg-white/[0.06]"
            >
              <Plus className="h-4 w-4" />
              New blog
            </button>

            <Link
              href="/#blogs"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/70 hover:bg-white/[0.06]"
            >
              View blogs
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </header>

        {(errorMessage || statusMessage) && (
          <div className="mt-6 grid gap-3">
            {errorMessage && (
              <div className="rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-sm text-red-300">
                {errorMessage}
              </div>
            )}

            {statusMessage && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/30 p-4 text-sm text-emerald-300">
                {statusMessage}
              </div>
            )}
          </div>
        )}

        <section className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <form
            onSubmit={saveBlog}
            className="rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                  {editingId ? "Editing article" : "New article"}
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  {editingId ? "Update blog" : "Create blog"}
                </h2>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-sm text-white/45 hover:text-white"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <div className="mt-6 grid gap-5">
              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                      slug:
                        current.slug ||
                        createSlug(event.target.value),
                    }))
                  }
                  required
                  className="input-style"
                  placeholder="How I built..."
                />
              </Field>

              <Field label="Slug">
                <input
                  value={form.slug}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      slug: createSlug(event.target.value),
                    }))
                  }
                  required
                  className="input-style"
                  placeholder="how-i-built..."
                />
              </Field>

              <Field label="Excerpt">
                <textarea
                  value={form.excerpt}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      excerpt: event.target.value,
                    }))
                  }
                  rows={3}
                  className="input-style resize-none"
                  placeholder="Short summary shown on the portfolio..."
                />
              </Field>

              <Field label="Content">
                <textarea
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      content: event.target.value,
                    }))
                  }
                  rows={14}
                  required
                  className="input-style resize-y"
                  placeholder="Write your complete article..."
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Category">
                  <input
                    value={form.category}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className="input-style"
                    placeholder="Next.js"
                  />
                </Field>

                <Field label="Tags">
                  <input
                    value={form.tags}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        tags: event.target.value,
                      }))
                    }
                    className="input-style"
                    placeholder="nextjs, react, supabase"
                  />
                </Field>
              </div>

              <Field label="Cover image URL">
                <input
                  type="url"
                  value={form.coverImageUrl}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      coverImageUrl: event.target.value,
                    }))
                  }
                  className="input-style"
                  placeholder="https://..."
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value as BlogStatus,
                      }))
                    }
                    className="input-style"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
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
                  Featured article
                </label>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
              >
                {saving && (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                )}

                {editingId
                  ? "Update blog"
                  : form.status === "published"
                    ? "Publish blog"
                    : "Save draft"}
              </button>
            </div>
          </form>

          <section className="rounded-[1.75rem] border border-white/10 bg-[#101010] p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                  Articles
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  Existing blogs
                </h2>
              </div>

              <button
                type="button"
                onClick={() => void loadBlogs()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/60 hover:bg-white/[0.06] disabled:opacity-50"
              >
                <RefreshCw
                  className={`h-4 w-4 ${
                    loading ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              {loading ? (
                [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-40 animate-pulse rounded-2xl bg-white/[0.04]"
                  />
                ))
              ) : blogs.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 px-6 py-14 text-center text-white/40">
                  No blogs yet.
                </div>
              ) : (
                blogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs ${
                              blog.status === "published"
                                ? "bg-emerald-950/40 text-emerald-300"
                                : "bg-amber-950/40 text-amber-300"
                            }`}
                          >
                            {blog.status}
                          </span>

                          {blog.featured && (
                            <span className="rounded-full bg-purple-950/40 px-2.5 py-1 text-xs text-purple-300">
                              Featured
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-lg font-semibold">
                          {blog.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/45">
                          {blog.excerpt || "No excerpt provided."}
                        </p>

                        <p className="mt-3 text-xs text-white/30">
                          /blogs/{blog.slug}
                        </p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => editBlog(blog)}
                          className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/[0.06]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => void deleteBlog(blog)}
                          disabled={deletingId === blog.id}
                          className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-3 py-2 text-sm text-red-300 hover:bg-red-950/40 disabled:opacity-50"
                        >
                          {deletingId === blog.id ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          Delete
                        </button>
                      </div>
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
          border-color: rgba(34, 211, 238, 0.45);
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