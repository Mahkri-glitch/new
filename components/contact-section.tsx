import { MailIcon, MessageCircleIcon } from '@/lib/icons';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative z-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center sm:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle gradient glow in the card */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">Contact Us</h2>
            <p className="mx-auto max-w-xl text-lg text-zinc-400 leading-relaxed mb-10">
              Interested in semiconductors, microelectronics, fabrication, materials, or career readiness? Reach out and get
              connected.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:scro.ucf@gmail.com" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFD51E] px-8 text-base font-semibold text-black transition-all hover:bg-[#e6c01b] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,213,30,0.3)]">
                <MailIcon className="mr-2 h-5 w-5" /> Email Us
              </a>
              <a href="https://discord.gg/F9PTT3FJFS" className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:text-white">
                <MessageCircleIcon className="mr-2 h-5 w-5" /> Join Our Discord
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
