import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  LayoutDashboard,
  MessageSquareText,
  Quote,
} from "lucide-react";

const adminCards = [
  {
    title: "Feedback",
    description:
      "Review, approve, move to pending, or delete visitor feedback.",
    href: "/admin/feedback",
    icon: MessageSquareText,
  },
  {
    title: "Blogs",
    description:
      "Create, edit, publish, and manage portfolio blog articles.",
    href: "/admin/blogs",
    icon: BookOpenText,
  },
  {
    title: "Daily Quotes",
    description:
      "Create, schedule, publish, and manage portfolio quotes.",
    href: "/admin/quotes",
    icon: Quote,
  },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-white/10 pb-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-purple-300" />

            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
              Portfolio Admin
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Content dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
            Manage feedback, publish blog posts, and update daily
            quotes from one place.
          </p>
        </header>

        <section className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {adminCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.href}
                href={card.href}
                className="group flex min-h-72 flex-col rounded-[1.5rem] border border-white/10 bg-[#101010] p-7 transition hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.05]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-950/40 text-purple-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mt-7 text-2xl font-semibold">
                  {card.title}
                </h2>

                <p className="mt-4 leading-7 text-white/45">
                  {card.description}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-purple-300">
                  Open section

                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </section>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/60 transition hover:bg-white/[0.05] hover:text-white"
        >
          View portfolio
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}