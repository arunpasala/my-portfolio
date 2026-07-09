export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 text-sm text-slate-400 sm:flex-row sm:items-center">
        <p>
          © 2026 Arun Portfolio. Crafted with Next.js and
          glassmorphism-inspired design.
        </p>

        <div className="flex items-center gap-5">
          <a href="#home" className="hover:text-white">
            Home
          </a>
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}