import { Mail, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20">
      <SectionHeading
        label="Contact"
        title="Let’s build something professional and impactful."
      />

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
          <h3 className="text-2xl font-semibold text-white">Get in touch</h3>

          <p className="mt-4 leading-7 text-slate-300">
            I’m currently open to software engineering, backend, frontend, and
            full-stack opportunities. I’m especially interested in building
            scalable products with strong user experience, secure architecture,
            and reliable backend systems.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="h-5 w-5 text-cyan-300" />
              <span>balaarunpasala.dev@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <Phone className="h-5 w-5 text-cyan-300" />
              <span>+1 (413) 381-8673</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 backdrop-blur-2xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}