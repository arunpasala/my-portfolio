import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Profile from "@/components/profile/Profile";
import Services from "@/components/services/Services";
import Projects from "@/components/projects/Projects";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/layout/Footer";
import AnimatedShowcase from "@/components/home/AnimatedShowcase";
import Blogs from "@/components/blogs/Blogs";
import FeedbackWall from "@/components/sections/FeedbackWall";
import GitHubContributions from "@/components/sections/GitHubContributions";
import Testimonials from "@/components/sections/Testimonials";
import WorkExperience from "@/components/profile/WorkExperience";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-0 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      <Navbar />
      
      <Hero />
      <Profile />
      <AnimatedShowcase />

      <Services />
      <Projects />

      <Blogs />
      
      <GitHubContributions />
       {/* Visitor feedback wall */}
        <FeedbackWall />
        <Testimonials />
        <Contact />
      <Footer />
    </main>
  );
}