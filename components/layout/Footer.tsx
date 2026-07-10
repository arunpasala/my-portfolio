export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#09090b]">
      {/* Top Section */}
      <div className="mx-auto grid max-w-7xl gap-12 border-b border-white/10 px-6 py-16 lg:grid-cols-[1.2fr_2fr]">
        {/* Left */}
        <div>
          <h2 className="text-5xl font-black tracking-tight text-white">
            AR <span className="text-cyan-300">.</span>
          </h2>

          <p className="mt-8 max-w-sm text-lg leading-8 text-slate-400">
            I'm{" "}
            <span className="animated-gradient font-semibold">
              Bala Arun Pasala
            </span>{" "}
            — a Full-Stack Software Engineer passionate about building scalable
            applications, beautiful user experiences, AI-powered products, and
            modern web experiences.
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {/* General */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              General
            </h4>

            <div className="space-y-4">
              <a
                href="#home"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Home
              </a>

              <a
                href="#profile"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Profile
              </a>

              <a
                href="#projects"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Projects
              </a>

              <a
                href="#blog"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Portfolio */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Portfolio
            </h4>

            <div className="space-y-4">
              <a
                href="#experience"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Experience
              </a>

              <a
                href="#skills"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Skills
              </a>

              <a
                href="#education"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Education
              </a>

              <a
                href="/resume.pdf"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
              Connect
            </h4>

            <div className="space-y-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                LinkedIn
              </a>

              <a
                href="mailto:your@email.com"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Email
              </a>

              <a
                href="#contact"
                className="block text-lg text-white transition hover:text-cyan-400"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 md:flex-row">
        <p>
          © 2026{" "}
          <span className="animated-gradient font-semibold">
            Bala Arun Pasala
          </span>
          . All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <a href="#" className="transition hover:text-white">
            Privacy Policy
          </a>

          <a href="#" className="transition hover:text-white">
            Terms of Use
          </a>

          <a href="/sitemap.xml" className="transition hover:text-white">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}