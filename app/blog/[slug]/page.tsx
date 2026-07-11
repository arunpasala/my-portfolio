import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
} from "lucide-react";

import { supabaseAdmin } from "@/lib/supabase-admin";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPage({
  params,
}: BlogPageProps) {
  const { slug } = await params;

  const { data: blog, error } =
    await supabaseAdmin
      .from("portfolio_blogs")
      .select(
        `
          id,
          title,
          slug,
          excerpt,
          content,
          cover_image_url,
          category,
          tags,
          author_name,
          published_at,
          created_at
        `
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();

  if (error || !blog) {
    notFound();
  }

  const publishedDate = new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  ).format(
    new Date(
      blog.published_at ?? blog.created_at
    )
  );

  return (
    <main className="min-h-screen bg-[#070707] px-6 py-16 text-white">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/#blogs"
          className="inline-flex items-center gap-2 text-sm text-cyan-300 transition hover:text-cyan-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Link>

        <header className="mt-10">
          {blog.category && (
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              {blog.category}
            </p>
          )}

          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="mt-6 text-lg leading-8 text-slate-400">
              {blog.excerpt}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span>
              By {blog.author_name}
            </span>

            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {publishedDate}
            </span>
          </div>
        </header>

        {blog.cover_image_url && (
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10">
            <img
              src={blog.cover_image_url}
              alt={blog.title}
              className="max-h-[520px] w-full object-cover"
            />
          </div>
        )}

        {blog.tags &&
          blog.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        <div className="mt-12 whitespace-pre-wrap text-base leading-8 text-slate-300 sm:text-lg">
          {blog.content}
        </div>
      </article>
    </main>
  );
}