"use client";

// ======================================================
// IMPORTS
// ======================================================
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { useContactDrawer } from "@/components/contact/ContactDrawerProvider";

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

  // Contact drawer controls
  const { openContactDrawer } = useContactDrawer();

  // ======================================================
  // SCROLL LISTENER
  // Navbar becomes smaller and more transparent after scroll
  // ======================================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ======================================================
  // OPEN CONTACT DRAWER
  // ======================================================
  const handleContactClick = () => {
    setActiveItem("Contact");
    setMenuOpen(false);
    openContactDrawer();
  };

  return (
    <>
      {/* ======================================================
          FIXED NAVBAR
      ====================================================== */}
      <motion.header
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed left-0 right-0 top-0 z-[9999] w-full px-4 pt-4"
      >
        {/* ====================================================
            MAIN NAVBAR CONTAINER

            Before scroll:
            - wider
            - taller
            - darker
            - stronger shadow

            After scroll:
            - slightly compressed
            - more transparent
            - softer shadow
        ===================================================== */}
        <motion.div
          layout
          animate={{
            maxWidth: isScrolled ? 1000 : 1200,
            height: isScrolled ? 58 : 72,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`mx-auto grid grid-cols-2 items-center gap-4 rounded-full px-4 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 lg:grid-cols-3 ${
            isScrolled
              ? "border border-white/5 bg-slate-950/20 shadow-none backdrop-blur-xl"
              : "border border-white/10 bg-slate-950/90 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          }`}
        >
          {/* ==================================================
              LEFT SECTION
              Logo, name, and title
          =================================================== */}
          <motion.div layout className="flex justify-start">
            <motion.a
              href="#home"
              whileHover={{
                x: 3,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
              className="group flex min-w-0 items-center gap-3"
            >
              {/* ==================================================
                  INITIALS LOGO
              =================================================== */}
              <motion.div
                layout
                animate={{
                  width: isScrolled ? 38 : 44,
                  height: isScrolled ? 38 : 44,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  boxShadow: "0 12px 30px rgba(8, 145, 178, 0.28)",
                }}
                whileTap={{
                  scale: 0.94,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isScrolled
                    ? "border-white/10 bg-slate-950/30 backdrop-blur-xl hover:border-cyan-700/60 hover:bg-cyan-950/70"
                    : "border-white/15 bg-white/10 hover:border-cyan-700/60 hover:bg-cyan-950/70"
                }`}
              >
                <motion.span
                  animate={{
                    fontSize: isScrolled ? 12 : 14,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="font-bold tracking-[0.18em] text-cyan-300"
                >
                  AR
                </motion.span>
              </motion.div>

              {/* ==================================================
                  NAME AND TITLE
              =================================================== */}
              <motion.div
                layout
                animate={{
                  opacity: isScrolled ? 0.9 : 1,
                  scale: isScrolled ? 0.97 : 1,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="hidden min-w-0 origin-left sm:block"
              >
                <motion.p
                  animate={{
                    fontSize: isScrolled ? 13 : 14,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="truncate font-semibold text-white transition-colors duration-300 group-hover:text-cyan-100"
                >
                  Bala Arun Pasala
                </motion.p>

                <motion.p
                  animate={{
                    fontSize: isScrolled ? 10 : 12,
                  }}
                  transition={{
                    duration: 0.35,
                  }}
                  className="truncate text-slate-400 transition-colors duration-300 group-hover:text-cyan-300/80"
                >
                  Software Engineer • Full-Stack Developer
                </motion.p>
              </motion.div>
            </motion.a>
          </motion.div>

          {/* ==================================================
              CENTER SECTION
              Navigation pill
          =================================================== */}
          <motion.div layout className="hidden justify-center lg:flex">
            <motion.nav
              layout
              animate={{
                scale: isScrolled ? 0.94 : 1,
              }}
              whileHover={{
                scale: isScrolled ? 0.96 : 1.015,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`flex items-center rounded-full border p-1 transition-all duration-500 ${
                isScrolled
                  ? "border-white/10 bg-slate-950/35 shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-xl"
                  : "border-white/10 bg-white/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.38)] backdrop-blur-2xl"
              }`}
            >
              {navItems.map((item) => {
                const isActive = activeItem === item.label;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setActiveItem(item.label)}
                    whileHover={{
                      y: -2,
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-cyan-200"
                        : "text-slate-300 hover:bg-cyan-950/80 hover:text-cyan-200"
                    }`}
                  >
                    {/* ==================================================
                        ACTIVE NAVIGATION BACKGROUND
                    =================================================== */}
                    {isActive && (
                      <motion.span
                        layoutId="active-navbar-item"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                        }}
                        className="absolute inset-0 rounded-full bg-cyan-950/90 shadow-[inset_0_1px_0_rgba(34,211,238,0.18),0_8px_24px_rgba(8,145,178,0.14)]"
                      />
                    )}

                    {/* ==================================================
                        HOVER GLOW BACKGROUND
                    =================================================== */}
                    {!isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan-950/0 via-cyan-900/45 to-cyan-950/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    )}

                    {/* ==================================================
                        HOVER SHINE
                    =================================================== */}
                    {!isActive && (
                      <span className="pointer-events-none absolute inset-y-0 left-[-45%] w-1/3 skew-x-[-20deg] bg-white/10 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100" />
                    )}

                    {/* ==================================================
                        NAVIGATION TEXT
                    =================================================== */}
                    <span className="relative z-10">
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </motion.nav>
          </motion.div>

          {/* ==================================================
              RIGHT SECTION
              Separate Let's Connect button
          =================================================== */}
          <motion.div layout className="hidden justify-end lg:flex">
            <motion.button
              type="button"
              onClick={handleContactClick}
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              animate={{
                paddingLeft: isScrolled ? 16 : 20,
                paddingRight: isScrolled ? 16 : 20,
                paddingTop: isScrolled ? 8 : 10,
                paddingBottom: isScrolled ? 8 : 10,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? "border-cyan-800/40 bg-cyan-950/35 text-cyan-200 backdrop-blur-xl hover:border-cyan-600/70 hover:bg-cyan-900/80 hover:text-white hover:shadow-[0_10px_35px_rgba(8,145,178,0.28)]"
                  : "border-cyan-800/60 bg-cyan-950/80 text-cyan-200 shadow-[0_10px_30px_rgba(8,145,178,0.16)] hover:border-cyan-600 hover:bg-cyan-900 hover:text-white hover:shadow-[0_12px_38px_rgba(8,145,178,0.34)]"
              }`}
            >
              {/* Hover shine */}
              <span className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 skew-x-[-20deg] bg-white/15 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100" />

              <span className="relative z-10">
                Let&apos;s Connect
              </span>

              <motion.span
                className="relative z-10"
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.span>
            </motion.button>
          </motion.div>

          {/* ==================================================
              MOBILE MENU BUTTON
          =================================================== */}
          <div className="flex justify-end lg:hidden">
            <motion.button
              type="button"
              onClick={() => setMenuOpen((previous) => !previous)}
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className={`rounded-full border p-2.5 text-slate-200 transition-all duration-300 ${
                isScrolled
                  ? "border-white/5 bg-slate-950/30 backdrop-blur-xl"
                  : "border-white/10 bg-white/[0.08]"
              } hover:border-cyan-700/60 hover:bg-cyan-950/80 hover:text-cyan-200 hover:shadow-[0_10px_28px_rgba(8,145,178,0.22)]`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.7,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* ==================================================
            MOBILE NAVIGATION MENU
        =================================================== */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -16,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -12,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-3 max-w-[1440px] origin-top rounded-3xl border border-white/10 bg-slate-950/80 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden"
            >
              <nav className="flex flex-col gap-2">
                {/* ==================================================
                    MOBILE NAVIGATION LINKS
                =================================================== */}
                {navItems.map((item, index) => {
                  const isActive = activeItem === item.label;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.25,
                      }}
                      whileHover={{
                        x: 4,
                        scale: 1.01,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      onClick={() => {
                        setActiveItem(item.label);
                        setMenuOpen(false);
                      }}
                      className={`group relative overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-950/90 text-cyan-200"
                          : "text-slate-300 hover:bg-cyan-950/80 hover:text-cyan-200 hover:shadow-[0_8px_24px_rgba(8,145,178,0.14)]"
                      }`}
                    >
                      {!isActive && (
                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-950/0 via-cyan-900/35 to-cyan-950/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      )}

                      <span className="relative z-10">
                        {item.label}
                      </span>
                    </motion.a>
                  );
                })}

                {/* ==================================================
                    MOBILE CONTACT BUTTON
                =================================================== */}
                <motion.button
                  type="button"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: navItems.length * 0.05,
                    duration: 0.3,
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleContactClick}
                  className="group relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-cyan-800/60 bg-cyan-950/80 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-300 hover:border-cyan-600 hover:bg-cyan-900 hover:text-white hover:shadow-[0_10px_30px_rgba(8,145,178,0.25)]"
                >
                  <span className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 skew-x-[-20deg] bg-white/15 opacity-0 transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100" />

                  <span className="relative z-10">
                    Let&apos;s Connect
                  </span>

                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ======================================================
          TOP SPACING
          Prevents page content from hiding behind fixed navbar
      ====================================================== */}
      <div className="h-24" />
    </>
  );
}