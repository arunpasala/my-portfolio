"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Quote,
  X,
} from "lucide-react";

import { useAdmin } from "@/components/admin/AdminProvider";

const adminLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/feedback",
    label: "Feedback",
    icon: MessageSquareText,
  },
  {
    href: "/admin/blogs",
    label: "Blogs",
    icon: BookOpenText,
  },
  {
    href: "/admin/quotes",
    label: "Daily Quotes",
    icon: Quote,
  },
];

function getAdminName(
  session: ReturnType<typeof useAdmin>["session"]
) {
  const user = session?.user;

  return (
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Administrator"
  );
}

function getAdminAvatar(
  session: ReturnType<typeof useAdmin>["session"]
) {
  const user = session?.user;

  return (
    user?.user_metadata?.avatar_url ??
    user?.user_metadata?.picture ??
    null
  );
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const {
    session,
    sessionLoading,
    loadingProvider,
    authError,
    signIn,
    signOut,
  } = useAdmin();

  if (sessionLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] text-white">
        Checking admin session...
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070707] px-5 text-white">
        <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#101010] p-8">
          <h1 className="text-center text-3xl font-semibold">
            Sign in to Admin CMS
          </h1>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              disabled={loadingProvider !== null}
              onClick={() => void signIn("google")}
              className="rounded-2xl bg-white px-5 py-3.5 font-semibold text-black"
            >
              Continue with Google
            </button>

            <button
              type="button"
              disabled={loadingProvider !== null}
              onClick={() => void signIn("github")}
              className="rounded-2xl border border-white/10 px-5 py-3.5"
            >
              Continue with GitHub
            </button>
          </div>

          {authError && (
            <p className="mt-4 text-sm text-red-300">
              {authError}
            </p>
          )}
        </section>
      </main>
    );
  }

  const adminName = getAdminName(session);
  const adminAvatar = getAdminAvatar(session);

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/95 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
              Portfolio
            </p>

            <h1 className="text-lg font-semibold">
              Admin CMS
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open admin menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.08]"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              setMenuOpen(false);
            }
          }}
        >
          <aside className="ml-auto flex h-full w-[88%] max-w-sm flex-col border-l border-white/10 bg-[#0d0d0d] p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-purple-300">
                  Portfolio
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Admin menu
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close admin menu"
                className="rounded-xl border border-white/10 p-2 text-white/70 hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 grid gap-2">
              {adminLinks.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  (item.href !== "/admin" &&
                    pathname.startsWith(`${item.href}/`));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-white text-black"
                        : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-5">
              <div className="flex items-center gap-3">
                {adminAvatar ? (
                  <img
                    src={adminAvatar}
                    alt={adminName}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 font-bold">
                    {adminName.slice(0, 1).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {adminName}
                  </p>

                  <p className="truncate text-xs text-white/35">
                    {session.user.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2">
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/60 hover:bg-white/[0.06] hover:text-white"
                >
                  View portfolio
                  <ExternalLink className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => void signOut()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-950/20 px-4 py-3 text-sm text-red-300 hover:bg-red-950/40"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      <div className="min-w-0">
        {children}
      </div>
    </div>
  );
}