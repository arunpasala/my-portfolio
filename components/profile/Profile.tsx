"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Coffee,
  MapPin,
  Plane,
  Sparkles,
  UserRound,
} from "lucide-react";

import WorkExperience from "@/components/profile/WorkExperience";

// ======================================================
// TYPES
// ======================================================

type GalleryItem = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: typeof Code2;
};

type ProfileView = "about" | "experience";

// ======================================================
// GALLERY DATA
// ======================================================

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    eyebrow: "What I enjoy",
    title: "Building Products",
    description:
      "I enjoy transforming ideas into scalable digital products with thoughtful interfaces, reliable APIs, and maintainable architecture.",
    image: "/profile-gallery/coding.jpg",
    icon: Code2,
  },
  {
    id: 2,
    eyebrow: "What inspires me",
    title: "Exploring New Places",
    description:
      "Travel gives me new perspectives, creative energy, and a better understanding of how different people experience the world.",
    image: "/profile-gallery/travel.jpg",
    icon: Plane,
  },
  {
    id: 3,
    eyebrow: "How I grow",
    title: "Learning Technology",
    description:
      "I like experimenting with modern frameworks, artificial intelligence, backend systems, and tools that improve product development.",
    image: "/profile-gallery/technology.jpg",
    icon: Sparkles,
  },
  {
    id: 4,
    eyebrow: "How I focus",
    title: "Coffee and Deep Work",
    description:
      "A calm workspace, good music, and coffee help me focus deeply while solving technical and creative problems.",
    image: "/profile-gallery/profile.png",
    icon: Coffee,
  },    
];

// ======================================================
// LOCAL SOCIAL ICONS
// ======================================================

function GitHubIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .7C5.65.7.5 5.85.5 12.2c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18A10.99 10.99 0 0 1 12 6.35c.98 0 1.95.13 2.87.39 2.19-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.03c0 .31.21.68.79.56 4.56-1.52 7.85-5.83 7.85-10.91C23.5 5.85 18.35.7 12 .7Z" />
    </svg>
  );
}

function LinkedInIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M5.34 3.5A2.84 2.84 0 1 1 5.34 9.18 2.84 2.84 0 0 1 5.34 3.5ZM2.9 10.75h4.88V21H2.9V10.75Zm7.65 0h4.68v1.4h.07c.65-1.23 2.24-2.53 4.61-2.53 4.93 0 5.84 3.25 5.84 7.47V21h-4.88v-3.47c0-2.08-.04-4.76-2.9-4.76-2.9 0-3.35 2.27-3.35 4.61V21h-4.87V10.75Z" />
    </svg>
  );
}

// ======================================================
// BACKGROUND PARTICLES
// ======================================================

const particles = [
  {
    left: "7%",
    top: "14%",
    size: 3,
    duration: 7,
  },
  {
    left: "18%",
    top: "78%",
    size: 2,
    duration: 9,
  },
  {
    left: "31%",
    top: "22%",
    size: 4,
    duration: 8,
  },
  {
    left: "54%",
    top: "12%",
    size: 2,
    duration: 10,
  },
  {
    left: "72%",
    top: "82%",
    size: 3,
    duration: 7,
  },
  {
    left: "88%",
    top: "29%",
    size: 2,
    duration: 9,
  },
  {
    left: "95%",
    top: "69%",
    size: 4,
    duration: 11,
  },
];

// ======================================================
// PROFILE COMPONENT
// ======================================================

export default function Profile() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);

  const [profileView, setProfileView] =
    useState<ProfileView>("about");

  const galleryRef =
    useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 90,
    damping: 20,
    mass: 0.5,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 90,
    damping: 20,
    mass: 0.5,
  });

  const stackRotateY = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-7, 7]
  );

  const stackRotateX = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [7, -7]
  );

  const stackX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    [-8, 8]
  );

  const stackY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    [-6, 6]
  );

  // ======================================================
  // AUTOMATIC ROTATION
  // ======================================================

  useEffect(() => {
    if (
      isPaused ||
      profileView !== "about"
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex(
        (current) =>
          (current + 1) % galleryItems.length
      );
    }, 4200);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, profileView]);

  // ======================================================
  // GALLERY NAVIGATION
  // ======================================================

  const showPrevious = () => {
    setActiveIndex(
      (current) =>
        (current -
          1 +
          galleryItems.length) %
        galleryItems.length
    );
  };

  const showNext = () => {
    setActiveIndex(
      (current) =>
        (current + 1) %
        galleryItems.length
    );
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!galleryRef.current) {
      return;
    }

    const bounds =
      galleryRef.current.getBoundingClientRect();

    const normalizedX =
      (event.clientX - bounds.left) /
        bounds.width -
      0.5;

    const normalizedY =
      (event.clientY - bounds.top) /
        bounds.height -
      0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsPaused(false);
  };

  const getCardPosition = (
    index: number
  ) => {
    return (
      (index -
        activeIndex +
        galleryItems.length) %
      galleryItems.length
    );
  };

  const activeItem =
    galleryItems[activeIndex];

  return (
    <section
      id="profile"
      className="relative isolate overflow-hidden px-6 py-24 sm:px-8 lg:px-10 lg:py-32"
    >
      {/* ==================================================
          BACKGROUND
      =================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-20 bg-[#020617]" />

      <div className="pointer-events-none absolute -left-24 top-28 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-[440px] w-[440px] rounded-full bg-blue-600/10 blur-[170px]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:70px_70px]" />

      {particles.map(
        (particle, index) => (
          <motion.span
            key={index}
            className="pointer-events-none absolute rounded-full bg-cyan-300/50"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [
                0.15,
                0.75,
                0.15,
              ],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration:
                particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.35,
            }}
          />
        )
      )}

      <div className="mx-auto max-w-7xl">
        {/* ==================================================
            SECTION LABEL
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-400 sm:text-sm">
            More About Me
          </span>

          <span className="h-px w-16 bg-gradient-to-r from-cyan-400/70 to-transparent" />
        </motion.div>

        {/* ==================================================
            PROFILE VIEW TABS
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
            delay: 0.1,
          }}
          className="mb-12 flex w-fit max-w-full items-center gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-xl"
        >
          <button
            type="button"
            onClick={() =>
              setProfileView("about")
            }
            className={`relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              profileView === "about"
                ? "text-[#020617]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {profileView === "about" && (
              <motion.span
                layoutId="profile-active-tab"
                className="absolute inset-0 rounded-xl bg-white"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 32,
                }}
              />
            )}

            <UserRound className="relative z-10 h-4 w-4" />

            <span className="relative z-10">
              About Me
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setProfileView(
                "experience"
              )
            }
            className={`relative inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              profileView ===
              "experience"
                ? "text-[#020617]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {profileView ===
              "experience" && (
              <motion.span
                layoutId="profile-active-tab"
                className="absolute inset-0 rounded-xl bg-white"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 32,
                }}
              />
            )}

            <BriefcaseBusiness className="relative z-10 h-4 w-4" />

            <span className="relative z-10">
              Work Experience
            </span>
          </button>
        </motion.div>

        {/* ==================================================
            PROFILE CONTENT
        =================================================== */}

        <AnimatePresence mode="wait">
          {profileView === "about" ? (
            <motion.div
              key="about-profile"
              initial={{
                opacity: 0,
                y: 24,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -18,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.45,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <div className="grid items-center gap-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-24">
                {/* ==========================================
                    LEFT SIDE
                =========================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -45,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="relative z-10"
                >
                  <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-[3.6rem]">
                    I&apos;m Arun, a
                    <br />
                    creative{" "}
                    <motion.span
                      initial={{
                        backgroundPosition:
                          "0% 50%",
                      }}
                      animate={{
                        backgroundPosition:
                          "200% 50%",
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block bg-[linear-gradient(90deg,#22d3ee,#818cf8,#f472b6,#22d3ee)] bg-[length:200%_100%] bg-clip-text font-serif italic text-transparent"
                    >
                      engineer
                    </motion.span>
                    .
                  </h2>

                  <div className="mt-9 max-w-xl space-y-6 text-[1.02rem] leading-8 text-slate-300 sm:text-lg">
                    <p>
                      I&apos;m a
                      full-stack software
                      engineer who enjoys
                      building scalable web
                      applications, REST
                      APIs, backend services,
                      and polished user
                      experiences.
                    </p>

                    <p>
                      My development stack
                      includes Java, Spring
                      Boot, Node.js,
                      Express, React,
                      Next.js, TypeScript,
                      databases, and modern
                      cloud-based development
                      workflows.
                    </p>

                    <p>
                      I enjoy solving
                      complex problems,
                      learning new
                      technologies, and
                      turning ambitious ideas
                      into useful digital
                      products.
                    </p>
                  </div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.25,
                      duration: 0.6,
                    }}
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      Massachusetts, USA
                    </div>

                    <div className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-300 backdrop-blur-xl">
                      Full-Stack
                      Development
                    </div>

                    <div className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl">
                      Open to Opportunities
                    </div>
                  </motion.div>

                  <div className="mt-9 flex items-center gap-4">
                    <motion.a
                      whileHover={{
                        y: -4,
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                      href="https://www.linkedin.com/in/balaarunpasala/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open LinkedIn profile"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      <LinkedInIcon />
                    </motion.a>

                    <motion.a
                      whileHover={{
                        y: -4,
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.94,
                      }}
                      href="https://github.com/arunpasala"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open GitHub profile"
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300"
                    >
                      <GitHubIcon />
                    </motion.a>

                    <div className="ml-1 hidden items-center gap-3 sm:flex">
                      <span className="h-px w-12 bg-gradient-to-r from-cyan-400/70 to-transparent" />

                      <span className="text-sm text-slate-500">
                        Building. Learning.
                        Creating.
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* ==========================================
                    RIGHT SIDE — GALLERY
                =========================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    x: 45,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="relative"
                >
                  <div
                    ref={galleryRef}
                    onMouseMove={
                      handleMouseMove
                    }
                    onMouseEnter={() =>
                      setIsPaused(true)
                    }
                    onMouseLeave={
                      resetMousePosition
                    }
                    className="relative mx-auto h-[620px] w-full max-w-[680px] sm:h-[680px]"
                    style={{
                      perspective:
                        "1400px",
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 28,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="pointer-events-none absolute left-1/2 top-[38%] h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-400/10 sm:h-[480px] sm:w-[480px]"
                    />

                    <div className="pointer-events-none absolute left-1/2 top-[39%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

                    <motion.div
                      style={{
                        rotateX:
                          stackRotateX,
                        rotateY:
                          stackRotateY,
                        x: stackX,
                        y: stackY,
                        transformStyle:
                          "preserve-3d",
                      }}
                      className="absolute inset-x-0 top-0 h-[460px] sm:h-[520px]"
                    >
                      {galleryItems.map(
                        (item, index) => {
                          const position =
                            getCardPosition(
                              index
                            );

                          const isActive =
                            position === 0;

                          const Icon =
                            item.icon;

                          const desktopPositions =
                            [
                              {
                                x: 0,
                                y: 0,
                                rotateZ: 0,
                                rotateY: 0,
                                scale: 1,
                                opacity: 1,
                                zIndex: 40,
                              },
                              {
                                x: 150,
                                y: 32,
                                rotateZ: 10,
                                rotateY: -14,
                                scale: 0.87,
                                opacity: 0.7,
                                zIndex: 30,
                              },
                              {
                                x: 0,
                                y: 62,
                                rotateZ: 2,
                                rotateY: 0,
                                scale: 0.78,
                                opacity: 0.22,
                                zIndex: 10,
                              },
                              {
                                x: -150,
                                y: 32,
                                rotateZ: -10,
                                rotateY: 14,
                                scale: 0.87,
                                opacity: 0.7,
                                zIndex: 20,
                              },
                            ];

                          return (
                            <motion.button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                setActiveIndex(
                                  index
                                )
                              }
                              drag={
                                isActive
                                  ? "x"
                                  : false
                              }
                              dragConstraints={{
                                left: 0,
                                right: 0,
                              }}
                              dragElastic={
                                0.18
                              }
                              onDragEnd={(
                                _,
                                info
                              ) => {
                                if (
                                  info.offset
                                    .x > 70
                                ) {
                                  showPrevious();
                                }

                                if (
                                  info.offset
                                    .x < -70
                                ) {
                                  showNext();
                                }
                              }}
                              initial={false}
                              animate={
                                desktopPositions[
                                  position
                                ]
                              }
                              transition={{
                                duration: 0.8,
                                ease: [
                                  0.22,
                                  1,
                                  0.36,
                                  1,
                                ],
                              }}
                              whileHover={
                                isActive
                                  ? {
                                      y: -10,
                                      scale:
                                        1.015,
                                    }
                                  : {
                                      scale:
                                        desktopPositions[
                                          position
                                        ]
                                          .scale +
                                        0.025,
                                    }
                              }
                              whileTap={
                                isActive
                                  ? {
                                      cursor:
                                        "grabbing",
                                    }
                                  : undefined
                              }
                              className={`absolute left-1/2 top-0 h-[405px] w-[255px] -translate-x-1/2 overflow-hidden rounded-[2rem] border text-left shadow-2xl sm:h-[490px] sm:w-[325px] ${
                                isActive
                                  ? "cursor-grab border-cyan-300/30 shadow-[0_35px_90px_rgba(8,145,178,0.2)]"
                                  : "cursor-pointer border-white/10 shadow-black/50"
                              }`}
                              style={{
                                transformOrigin:
                                  "bottom center",
                                transformStyle:
                                  "preserve-3d",
                              }}
                              aria-label={`Show ${item.title}`}
                            >
                              <motion.div
                                animate={{
                                  scale:
                                    isActive
                                      ? 1.06
                                      : 1,
                                }}
                                transition={{
                                  duration: 5,
                                  ease: "easeOut",
                                }}
                                className="absolute inset-0"
                              >
                                <Image
                                  src={
                                    item.image
                                  }
                                  alt={
                                    item.title
                                  }
                                  fill
                                  priority={
                                    index ===
                                    0
                                  }
                                  draggable={
                                    false
                                  }
                                  sizes="(max-width: 640px) 255px, 325px"
                                  className="select-none object-cover"
                                />
                              </motion.div>

                              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/15 to-black/10" />

                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent" />

                              <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-lg backdrop-blur-xl">
                                <Icon className="h-5 w-5" />
                              </div>

                              <div className="absolute bottom-0 left-0 right-0 p-6">
                                <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-cyan-300">
                                  {
                                    item.eyebrow
                                  }
                                </p>

                                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                  {
                                    item.title
                                  }
                                </h3>
                              </div>

                              {isActive && (
                                <motion.div
                                  key={
                                    activeIndex
                                  }
                                  initial={{
                                    scaleX: 0,
                                  }}
                                  animate={{
                                    scaleX: 1,
                                  }}
                                  transition={{
                                    duration: 4.2,
                                    ease: "linear",
                                  }}
                                  className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400"
                                />
                              )}
                            </motion.button>
                          );
                        }
                      )}
                    </motion.div>

                    <motion.button
                      type="button"
                      onClick={
                        showPrevious
                      }
                      whileHover={{
                        x: -4,
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.92,
                      }}
                      aria-label="Show previous gallery card"
                      className="absolute left-0 top-[185px] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#020617]/80 text-white shadow-xl backdrop-blur-xl transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 sm:left-4 sm:top-[220px]"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={showNext}
                      whileHover={{
                        x: 4,
                        scale: 1.05,
                      }}
                      whileTap={{
                        scale: 0.92,
                      }}
                      aria-label="Show next gallery card"
                      className="absolute right-0 top-[185px] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#020617]/80 text-white shadow-xl backdrop-blur-xl transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 sm:right-4 sm:top-[220px]"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>

                    <div className="absolute bottom-12 left-1/2 z-50 w-full max-w-[540px] -translate-x-1/2 px-1 sm:bottom-10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={
                            activeItem.id
                          }
                          initial={{
                            opacity: 0,
                            y: 18,
                            scale: 0.97,
                            filter:
                              "blur(6px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter:
                              "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            y: -12,
                            scale: 0.97,
                            filter:
                              "blur(6px)",
                          }}
                          transition={{
                            duration: 0.4,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                          className="rounded-[1.6rem] border border-white/10 bg-[#020617]/75 p-5 text-center shadow-[0_25px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6"
                        >
                          <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-400">
                            Currently showing
                          </p>

                          <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                            {
                              activeItem.title
                            }
                          </h3>

                          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400 sm:text-[0.95rem]">
                            {
                              activeItem.description
                            }
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center justify-center gap-2">
                    {galleryItems.map(
                      (item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            setActiveIndex(
                              index
                            )
                          }
                          aria-label={`Show ${item.title}`}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            activeIndex ===
                            index
                              ? "w-11 bg-cyan-400"
                              : "w-4 bg-white/15 hover:bg-white/40"
                          }`}
                        />
                      )
                    )}
                  </div>

                  <p className="mt-4 text-center text-xs text-slate-600">
                    Drag the active image or
                    use the arrows
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="work-experience"
              initial={{
                opacity: 0,
                y: 24,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: -18,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.45,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <WorkExperience />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}