"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion } from "framer-motion";
import {
  GitFork,
  Github,
  LoaderCircle,
  Star,
  Users,
} from "lucide-react";

type ContributionDay = {
  contributionCount: number;
  date: string;
  color: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type GitHubStats = {
  profile: {
    username: string;
    name: string | null;
    avatarUrl: string;
    profileUrl: string;
    followers: number;
    publicRepositories: number;
  };

  totals: {
    stars: number;
    forks: number;
    contributions: number;
  };

  weeks: ContributionWeek[];
};

type ApiResponse = GitHubStats & {
  error?: string;
};

const fallbackColors = [
  "bg-white/[0.07]",
  "bg-indigo-950",
  "bg-indigo-800",
  "bg-indigo-600",
  "bg-indigo-400",
];

function getContributionColor(
  contributionCount: number
) {
  if (contributionCount === 0) {
    return fallbackColors[0];
  }

  if (contributionCount <= 2) {
    return fallbackColors[1];
  }

  if (contributionCount <= 5) {
    return fallbackColors[2];
  }

  if (contributionCount <= 9) {
    return fallbackColors[3];
  }

  return fallbackColors[4];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation:
      value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function getMonthLabels(
  weeks: ContributionWeek[]
) {
  const labels: Array<{
    month: string;
    index: number;
  }> = [];

  let previousMonth = "";

  weeks.forEach((week, index) => {
    const firstDay =
      week.contributionDays[0];

    if (!firstDay) {
      return;
    }

    const month =
      new Intl.DateTimeFormat("en-US", {
        month: "short",
      }).format(new Date(firstDay.date));

    if (month !== previousMonth) {
      labels.push({
        month,
        index,
      });

      previousMonth = month;
    }
  });

  return labels;
}

export default function GitHubContributions() {
  const [stats, setStats] =
    useState<GitHubStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await fetch(
        "/api/github-stats",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const contentType =
        response.headers.get("content-type");

      if (
        !contentType?.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The GitHub API returned an invalid response."
        );
      }

      const result =
        (await response.json()) as ApiResponse;

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to load GitHub activity."
        );
      }

      setStats(result);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load GitHub activity."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  const monthLabels = useMemo(
    () =>
      stats
        ? getMonthLabels(stats.weeks)
        : [],
    [stats]
  );

  return (
    <section
      id="github"
      className="relative overflow-hidden bg-[#09090a] px-4 py-24 sm:px-6"
    >
      {/* Side texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-8 border-r border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_5px)] sm:w-16" />

        <div className="absolute inset-y-0 right-0 w-8 border-l border-white/10 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.035)_0px,rgba(255,255,255,0.035)_1px,transparent_1px,transparent_5px)] sm:w-16" />
      </div>

      <div className="relative mx-auto max-w-[1460px] border-x border-white/10 px-4 sm:px-8 lg:px-10">
        {/* =======================================================
      HEADING
======================================================= */}

<motion.header
  initial={{
    opacity: 0,
    y: 40,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
  }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="py-14 text-center sm:py-20"
>
  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
    OPEN SOURCE
  </p>

  <h2 className="mt-7 text-5xl font-light tracking-tight sm:text-7xl lg:text-[7rem]">
    <span className="text-white font-serif">
      Code &amp;
    </span>{" "}

    <span className="github-neon-gradient font-serif italic">
      Contributions
    </span>
  </h2>

  <motion.div
    initial={{
      width: 0,
      opacity: 0,
    }}
    whileInView={{
      width: 220,
      opacity: 1,
    }}
    transition={{
      delay: 0.5,
      duration: 0.8,
    }}
    viewport={{
      once: true,
    }}
    className="mx-auto mt-8 h-px rounded-full bg-gradient-to-r from-transparent via-violet-500/70 to-transparent"
  />
</motion.header>

        {loading && (
          <div className="flex min-h-[380px] items-center justify-center rounded-[1.75rem] border border-white/10 bg-[#0d0d0e]">
            <div className="flex items-center gap-3 text-white/50">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading GitHub activity...
            </div>
          </div>
        )}

        {!loading && errorMessage && (
          <div className="rounded-[1.75rem] border border-red-500/20 bg-red-950/20 px-6 py-16 text-center">
            <p className="text-red-300">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                void loadStats()
              }
              className="mt-5 rounded-xl border border-white/10 px-5 py-2.5 text-sm text-white transition hover:bg-white/10"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && stats && (
          <motion.div
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
              amount: 0.15,
            }}
            className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d0d0e] lg:grid-cols-[minmax(0,1fr)_310px]"
          >
            {/* Contribution graph */}
            <div className="min-w-0 border-b border-white/10 p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <a
                  href={
                    stats.profile.profileUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-0 items-center gap-3"
                >
                  <img
                    src={
                      stats.profile.avatarUrl
                    }
                    alt={
                      stats.profile.name ??
                      stats.profile.username
                    }
                    className="h-11 w-11 rounded-full border border-white/10 object-cover"
                  />

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      @
                      {
                        stats.profile
                          .username
                      }
                    </p>

                    <p className="mt-0.5 text-sm text-white/40 transition group-hover:text-white/60">
                      Contribution graph
                    </p>
                  </div>
                </a>

                <div className="text-left sm:text-right">
                  <p className="text-2xl font-bold text-white">
                    {formatNumber(
                      stats.totals
                        .contributions
                    )}
                  </p>

                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                    Contributions
                  </p>
                </div>
              </div>

              {/* Graph scroll area */}
              <div className="mt-9 overflow-x-auto pb-3">
                <div className="min-w-[850px]">
                  {/* Month labels */}
                  <div className="relative mb-3 h-5">
                    {monthLabels.map(
                      (label) => (
                        <span
                          key={`${label.month}-${label.index}`}
                          className="absolute text-xs font-semibold text-white/65"
                          style={{
                            left: `${label.index * 17}px`,
                          }}
                        >
                          {label.month}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex gap-[4px]">
                    {stats.weeks.map(
                      (week, weekIndex) => (
                        <div
                          key={weekIndex}
                          className="grid grid-rows-7 gap-[4px]"
                        >
                          {week.contributionDays.map(
                            (day) => (
                              <div
                                key={day.date}
                                title={`${day.contributionCount} contributions on ${day.date}`}
                                className={`h-[13px] w-[13px] rounded-[3px] transition hover:scale-125 ${getContributionColor(
                                  day.contributionCount
                                )}`}
                              />
                            )
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-5">
                    <p className="text-sm font-semibold text-white">
                      {
                        stats.totals
                          .contributions
                      }{" "}
                      contributions in the last
                      year
                    </p>

                    <div className="flex items-center gap-2 text-xs text-white/55">
                      <span>Less</span>

                      {fallbackColors.map(
                        (
                          color,
                          index
                        ) => (
                          <span
                            key={index}
                            className={`h-3.5 w-3.5 rounded-[3px] ${color}`}
                          />
                        )
                      )}

                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid sm:grid-cols-3 lg:grid-cols-1">
              <StatCard
                label="Followers"
                value={
                  stats.profile.followers
                }
                icon={
                  <Users className="h-5 w-5" />
                }
                textClass="text-fuchsia-400"
                decoration={
                  <>
                    <span className="absolute right-14 top-7 h-3 w-3 rounded-full border-2 border-fuchsia-400/40" />
                    <span className="absolute bottom-7 right-8 h-4 w-4 rounded-full border-2 border-fuchsia-400/30" />
                  </>
                }
              />

              <StatCard
                label="Forks"
                value={stats.totals.forks}
                icon={
                  <GitFork className="h-5 w-5" />
                }
                textClass="text-cyan-400"
                decoration={
                  <GitFork className="absolute bottom-5 right-9 h-7 w-7 rotate-12 text-cyan-400/25" />
                }
              />

              <StatCard
                label="GitHub Stars"
                value={stats.totals.stars}
                icon={
                  <Star className="h-5 w-5" />
                }
                textClass="text-amber-400"
                decoration={
                  <>
                    <Star className="absolute right-11 top-5 h-4 w-4 fill-current text-amber-400/35" />

                    <Star className="absolute bottom-6 right-24 h-3 w-3 fill-current text-amber-400/25" />
                  </>
                }
              />
            </div>
          </motion.div>
        )}

        <div className="h-16" />
      </div>
    </section>
  );
}

function StatCard({
  label,
  value,
  icon,
  textClass,
  decoration,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  textClass: string;
  decoration: React.ReactNode;
}) {
  return (
    <div className="relative min-h-36 overflow-hidden border-b border-white/10 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0">
      {decoration}

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white/55">
            {label}
          </p>

          <div className={textClass}>
            {icon}
          </div>
        </div>

        <p
          className={`mt-3 text-4xl font-bold ${textClass}`}
        >
          {formatNumber(value)}
        </p>
      </div>
    </div>
  );
}