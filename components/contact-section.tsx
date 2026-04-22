import { MailIcon, MessageCircleIcon } from '@/lib/icons';

import { SectionMotion } from '@/components/section-motion';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <SectionMotion id="contact" className="bg-black py-16 sm:py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-[rgba(255,213,30,0.35)] bg-[rgba(255,213,30,0.06)] px-6 py-10 text-center sm:px-10">
        <h2 className="text-3xl font-bold text-[var(--scro-white)] sm:text-4xl">Contact Us</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-[rgba(255,255,255,0.86)]">
          Interested in semiconductors, microelectronics, fabrication, materials, or career readiness? Reach out and get
          connected.
        </p>

        <div className="mt-5 space-y-2 text-sm text-[var(--scro-white)]">
          <p>Email: scro.ucf@gmail.com</p>
          <p>Discord: https://discord.gg/F9PTT3FJFS</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href="mailto:scro.ucf@gmail.com" className="min-w-40">
            <MailIcon className="mr-2 h-4 w-4" /> Email Us
          </Button>
          <Button href="https://discord.gg/F9PTT3FJFS" variant="outline" className="min-w-40">
            <MessageCircleIcon className="mr-2 h-4 w-4" /> Join Our Discord
          </Button>
        </div>
      </div>
    </SectionMotion>
  );
}
