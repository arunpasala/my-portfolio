"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Code2,
  FileText,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  category: string | null;
  tags: string[] | null;
  featured: boolean;
  author_name: string;
  published_at: string | null;
  created_at: string;
};

type BlogsResponse = {
  blogs?: Blog[];
  error?: string;
};

// ======================================================
// FALLBACK TOPICS
// Shown only when no blogs have been published
// ======================================================

const upcomingTopics = [
  {
    title: "Next.js Development",
    description:
      "Modern Next.js patterns, performance improvements, routing, and deployment.",
    icon: Code2,
  },
  {
    title: "Full-Stack Engineering",
    description:
      "Frontend, backend, databases, authentication, APIs, and real projects.",
    icon: FileText,
  },
  {
    title: "Developer Journey",
    description:
      "Career lessons, interview preparation, learning strategies, and progress.",
    icon: BookOpen,
  },
];

// ======================================================
// ANIMATION VARIANTS
// ======================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// ======================================================
// HELPERS
// ======================================================

function formatBlogDate(value: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getExcerpt(blog: Blog) {
  if (blog.excerpt?.trim()) {
    return blog.excerpt.trim();
  }

  const cleanContent = blog.content
    .replace(/[#>*_`~[\]()]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (cleanContent.length <= 150) {
    return cleanContent;
  }

  return `${cleanContent.slice(0, 150)}...`;
}

// ======================================================
// COMPONENT
// ======================================================

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // ======================================================
  // LOAD PUBLISHED BLOGS
  // ======================================================

  const loadBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch("/api/blogs", {
        method: "GET",
        cache: "no-store",
      });

      const contentType =
        response.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error(
          "The blogs API returned an invalid response."
        );
      }

      const result =
        (await response.json()) as BlogsResponse;

      if (!response.ok) {
        throw new Error(
          result.error ?? "Unable to load blogs."
        );
      }

      setBlogs(result.blogs ?? []);
    } catch (error) {
      console.error("Blog loading error:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load blogs."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadBlogs();
  }, [loadBlogs]);

  const featuredBlog =
    blogs.find((blog) => blog.featured) ??
    blogs[0] ??
    null;

  const remainingBlogs = featuredBlog
    ? blogs.filter(
        (blog) => blog.id !== featuredBlog.id
      )
    : [];

  return (
    <section
      id="blogs"
      className="relative overflow-hidden px-6 py-24 sm:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="absolute right-[5%] top-64 h-80 w-80 rounded-full bg-blue-500/10 blur-[150px]" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/10 blur-[150px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* ==================================================
            SECTION HEADING
        =================================================== */}

        <motion.div
          variants={itemVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300">
            <Sparkles className="h-4 w-4" />
            Blogs and technical writing
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ideas shaped through{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-purple-400 bg-clip-text text-transparent">
              code and experience
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Practical articles about full-stack development,
            Next.js, user interfaces, software engineering,
            projects, and lessons learned along the way.
          </p>
        </motion.div>

        {/* ==================================================
            LOADING STATE
        =================================================== */}

        {loading && (
          <motion.div
            variants={itemVariants}
            className="mt-14 grid gap-6 lg:grid-cols-2"
          >
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[320px] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]"
              />
            ))}
          </motion.div>
        )}

        {/* ==================================================
            ERROR STATE
        =================================================== */}

        {!loading && errorMessage && (
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-14 max-w-3xl rounded-[2rem] border border-red-500/20 bg-red-950/20 p-8 text-center"
          >
            <p className="text-red-300">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() => void loadBlogs()}
              className="mt-5 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Try again
            </button>
          </motion.div>
        )}

        {/* ==================================================
            PUBLISHED BLOGS
        =================================================== */}

        {!loading &&
          !errorMessage &&
          featuredBlog && (
            <>
              {/* Featured blog */}
              <motion.article
                variants={itemVariants}
                className="group relative mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
              >
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                  {/* Image */}
                  <div className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-cyan-950 via-slate-950 to-purple-950 lg:min-h-[430px]">
                    {featuredBlog.cover_image_url ? (
                      <img
                        src={
                          featuredBlog.cover_image_url
                        }
                        alt={featuredBlog.title}
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute left-1/4 top-1/4 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />

                        <div className="absolute bottom-1/4 right-1/4 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl" />

                        <BookOpen className="relative h-20 w-20 text-cyan-300/70" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl">
                      Featured article
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                      {featuredBlog.category && (
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-cyan-300">
                          {featuredBlog.category}
                        </span>
                      )}

                      {featuredBlog.published_at && (
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />

                          {formatBlogDate(
                            featuredBlog.published_at
                          )}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                      {featuredBlog.title}
                    </h3>

                    <p className="mt-5 leading-8 text-slate-400">
                      {getExcerpt(featuredBlog)}
                    </p>

                    {featuredBlog.tags &&
                      featuredBlog.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {featuredBlog.tags
                            .slice(0, 4)
                            .map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400"
                              >
                                #{tag}
                              </span>
                            ))}
                        </div>
                      )}

                    <Link
                      href={`/blogs/${featuredBlog.slug}`}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-400/15"
                    >
                      Read article

                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>

              {/* More blogs */}
              {remainingBlogs.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="mt-20"
                >
                  <div className="mb-8 flex items-end gap-6">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                        Latest writing
                      </p>

                      <h3 className="mt-3 text-3xl font-semibold text-white">
                        Recent articles
                      </h3>
                    </div>

                    <div className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {remainingBlogs.map(
                      (blog, index) => (
                        <motion.article
                          key={blog.id}
                          initial={{
                            opacity: 0,
                            y: 35,
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
                            duration: 0.65,
                            ease: [
                              0.22, 1, 0.36, 1,
                            ],
                          }}
                          whileHover={{
                            y: -8,
                          }}
                          className="group flex overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-colors hover:border-cyan-400/30 hover:bg-white/[0.065]"
                        >
                          <Link
                            href={`/blogs/${blog.slug}`}
                            className="flex w-full flex-col"
                          >
                            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-950 via-slate-950 to-purple-950">
                              {blog.cover_image_url ? (
                                <img
                                  src={
                                    blog.cover_image_url
                                  }
                                  alt={blog.title}
                                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full items-center justify-center">
                                  <BookOpen className="h-14 w-14 text-cyan-300/60" />
                                </div>
                              )}

                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            <div className="flex flex-1 flex-col p-7">
                              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                {blog.category && (
                                  <span className="text-cyan-300">
                                    {blog.category}
                                  </span>
                                )}

                                {blog.category &&
                                  blog.published_at && (
                                    <span>•</span>
                                  )}

                                {blog.published_at && (
                                  <span>
                                    {formatBlogDate(
                                      blog.published_at
                                    )}
                                  </span>
                                )}
                              </div>

                              <h4 className="mt-4 text-xl font-semibold leading-snug text-white">
                                {blog.title}
                              </h4>

                              <p className="mt-3 line-clamp-3 leading-7 text-slate-400">
                                {getExcerpt(blog)}
                              </p>

                              <div className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium text-cyan-300">
                                Read article

                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </Link>
                        </motion.article>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </>
          )}

        {/* ==================================================
            EMPTY STATE
        =================================================== */}

        {!loading &&
          !errorMessage &&
          blogs.length === 0 && (
            <>
              <motion.div
                variants={itemVariants}
                className="relative mx-auto mt-14 max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-2xl sm:p-12"
              >
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="relative flex flex-col items-center text-center">
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10"
                  >
                    <BookOpen className="h-9 w-9 text-cyan-300" />

                    <motion.span
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.45, 0, 0.45],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-3xl border border-cyan-300/30"
                    />
                  </motion.div>

                  <h3 className="mt-8 text-3xl font-semibold text-white sm:text-4xl">
                    First article is loading
                  </h3>

                  <p className="mt-4 max-w-xl leading-7 text-slate-400">
                    No articles have been published yet.
                    New technical writing will appear here
                    automatically after it is published from
                    the admin panel.
                  </p>

                  <motion.div
                    animate={{
                      opacity: [0.45, 1, 0.45],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mt-8 flex items-center gap-2 text-sm font-medium text-cyan-300"
                  >
                    <span>Preparing content</span>

                    <div className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.span
                          key={dot}
                          animate={{
                            y: [0, -5, 0],
                            opacity: [
                              0.4, 1, 0.4,
                            ],
                          }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: dot * 0.15,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                        />
                      ))}
                    </div>
                  </motion.div>

                  <div className="mt-7 w-full max-w-md">
                    <div className="flex justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                      <span>Writing</span>
                      <span>Coming soon</span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        animate={{
                          x: ["-120%", "380%"],
                        }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Planned topics */}
              <motion.div
                variants={itemVariants}
                className="mt-20"
              >
                <div className="mb-8 flex items-end gap-6">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.28em] text-cyan-300">
                      Coming soon
                    </p>

                    <h3 className="mt-3 text-3xl font-semibold text-white">
                      Topics I plan to share
                    </h3>
                  </div>

                  <div className="mb-3 hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {upcomingTopics.map(
                    (topic, index) => {
                      const Icon = topic.icon;

                      return (
                        <motion.article
                          key={topic.title}
                          initial={{
                            opacity: 0,
                            y: 35,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            delay: index * 0.12,
                            duration: 0.65,
                            ease: [
                              0.22, 1, 0.36, 1,
                            ],
                          }}
                          whileHover={{
                            y: -8,
                          }}
                          className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/30 hover:bg-white/[0.065]"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                            <Icon className="h-5 w-5" />
                          </div>

                          <h4 className="mt-6 text-xl font-semibold text-white">
                            {topic.title}
                          </h4>

                          <p className="mt-3 leading-7 text-slate-400">
                            {topic.description}
                          </p>

                          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-300">
                            Coming soon

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </motion.article>
                      );
                    }
                  )}
                </div>
              </motion.div>
            </>
          )}
      </motion.div>
    </section>
  );
}