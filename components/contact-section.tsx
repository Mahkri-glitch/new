import { MailIcon, MessageCircleIcon } from '@/lib/icons';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-zinc-800 bg-[#111] p-10 text-center sm:p-16">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Contact Us</h2>
          <p className="mx-auto max-w-xl text-zinc-400 leading-relaxed mb-8">
            Interested in semiconductors, microelectronics, fabrication, materials, or career readiness? Reach out and get
            connected.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:scro.ucf@gmail.com" className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-zinc-200">
              <MailIcon className="mr-2 h-4 w-4" /> Email Us
            </a>
            <a href="https://discord.gg/F9PTT3FJFS" className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-8 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white">
              <MessageCircleIcon className="mr-2 h-4 w-4" /> Join Our Discord
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
