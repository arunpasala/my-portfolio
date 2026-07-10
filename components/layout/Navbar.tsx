"use client";

// ======================================================
// IMPORTS
// ======================================================
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";

// ======================================================
// NAVBAR COMPONENT
// ======================================================
export default function Navbar() {
  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Active navigation item
  const [activeItem, setActiveItem] = useState("Home");

  // Detect whether the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // ======================================================
  // SCROLL LISTENER
  // Navbar becomes transparent after scrolling
  // ======================================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* ======================================================
          FIXED NAVBAR
      ====================================================== */}
      <header className="fixed left-0 right-0 top-0 z-[9999] w-full px-4 pt-4">
        {/* ====================================================
            MAIN NAVBAR CONTAINER

            Before scrolling:
            - dark background
            - border
            - shadow

            After scrolling:
            - transparent background
            - lighter border
            - stronger backdrop blur
        ===================================================== */}
        <div
 className={`mx-auto grid grid-cols-2 items-center rounded-full transition-all duration-500 ease-in-out lg:grid-cols-3 ${
  isScrolled
    ? "h-12 max-w-[950px] px-3 bg-slate-950/20 backdrop-blur-xl"
    : "h-16 max-w-[1250px] px-5 bg-slate-950/90 backdrop-blur-2xl"
  }`}
>
          {/* ==================================================
              LEFT SECTION
              Logo, name, and title
          =================================================== */}
          <div className="flex justify-start">
            <a href="#home" className="flex min-w-0 items-center gap-3">
              {/* Initials */}
             <div
  className={`flex shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
    isScrolled
      ? "h-9 w-9 border-white/10 bg-slate-950/30"
      : "h-11 w-11 border-white/15 bg-white/10"
  }`}
>
  <span
    className={`font-bold tracking-[0.18em] text-cyan-300 transition-all duration-500 ${
      isScrolled ? "text-xs" : "text-sm"
    }`}
  >
    AR
  </span>
</div>

              {/* Name and title */}
              <div className="hidden min-w-0 sm:block">
  <p
    className={`truncate font-semibold text-white transition-all duration-500 ${
      isScrolled ? "text-xs" : "text-sm"
    }`}
  >
    Bala Arun Pasala
  </p>

  <p
    className={`truncate text-slate-400 transition-all duration-500 ${
      isScrolled ? "text-[10px]" : "text-xs"
    }`}
  >
    Software Engineer • Full-Stack Developer
  </p>
</div>
            </a>
          </div>

          {/* ==================================================
              CENTER SECTION
              Navigation pill
          =================================================== */}
          <div className="hidden justify-center lg:flex">
            <nav
              className={`flex items-center rounded-full border p-1 transition-all duration-500 ${
                isScrolled
                  ? "border-white/5 bg-slate-950/25 backdrop-blur-xl"
                  : "border-white/10 bg-white/[0.06]"
              }`}
            >
              {navItems.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  <a
  key={item.label}
  href={item.href}
  onClick={() => setActiveItem(item.label)}
  className={`rounded-full font-medium transition-all duration-500 ${
    isScrolled ? "px-4 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
  } ${
    isActive
      ? "bg-cyan-950/90 text-cyan-200"
      : "text-slate-300 hover:bg-cyan-950/80 hover:text-cyan-200"
  }`}
>
  {item.label}
</a>
                );
              })}
            </nav>
          </div>

          {/* ==================================================
              RIGHT SECTION
              Separate Let's Connect button
          =================================================== */}
          <div className="hidden justify-end lg:flex">
            <a
  href="#contact"
  onClick={() => setActiveItem("Contact")}
  className={`inline-flex items-center gap-2 rounded-full border font-semibold transition-all duration-500 ${
    isScrolled
      ? "border-cyan-800/40 bg-cyan-950/30 px-4 py-1.5 text-xs text-cyan-200"
      : "border-cyan-800/60 bg-cyan-950/80 px-5 py-2.5 text-sm text-cyan-200"
  } hover:border-cyan-700 hover:bg-cyan-900 hover:text-white`}
>
  Let&apos;s Connect

  <ArrowRight
    className={`transition-all duration-500 ${
      isScrolled ? "h-3.5 w-3.5" : "h-4 w-4"
    }`}
  />
</a>
          </div>

          {/* ==================================================
              MOBILE MENU BUTTON
          =================================================== */}
          <div className="flex justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              className={`rounded-full border p-2.5 text-slate-200 transition-all duration-300 ${
                isScrolled
                  ? "border-white/5 bg-slate-950/30 backdrop-blur-xl"
                  : "border-white/10 bg-white/[0.08]"
              } hover:bg-cyan-950/80 hover:text-cyan-200`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE NAVIGATION MENU
        =================================================== */}
        {menuOpen && (
          <div className="mx-auto mt-3 max-w-[1440px] rounded-3xl border border-white/10 bg-slate-950/80 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActiveItem(item.label);
                      setMenuOpen(false);
                    }}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-cyan-950/90 text-cyan-200"
                        : "text-slate-300 hover:bg-cyan-950/80 hover:text-cyan-200"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={() => {
                  setActiveItem("Contact");
                  setMenuOpen(false);
                }}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-cyan-800/60 bg-cyan-950/80 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-700 hover:bg-cyan-900 hover:text-white"
              >
                Let&apos;s Connect
                <ArrowRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* ======================================================
          TOP SPACING
          Prevents page content from hiding behind fixed navbar
      ====================================================== */}
      <div className="h-24" />
    </>
  );
}