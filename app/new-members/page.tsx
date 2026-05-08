import { CheckCircle2Icon } from '@/lib/icons';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { SectionMotion } from '@/components/section-motion';
import { Accordion } from '@/components/ui/accordion';
import { faqItems, joinSteps, whatToExpect, whoShouldJoin } from '@/lib/data';

export default function NewMembersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-transparent">
        {/* Hero Section */}
        <SectionMotion className="relative py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,213,30,0.05)] to-transparent pointer-events-none" />
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 z-10">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter bg-gradient-to-b from-[#FFD51E] to-[#A07A00] bg-clip-text text-transparent drop-shadow-lg">
              New Member Hub
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[rgba(255,255,255,0.7)] max-w-2xl mx-auto font-light leading-relaxed">
              Everything you need to get plugged into SCRO @ UCF. We're excited to have you on board to build the future of hardware.
            </p>
          </div>
        </SectionMotion>

        {/* Welcome & Who Should Join */}
        <SectionMotion className="py-16 relative z-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-[rgba(255,213,30,0.15)] bg-gradient-to-br from-[#120d00] to-[#060606] p-8 md:p-12 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">You belong here.</h2>
                  <p className="text-[rgba(255,255,255,0.7)] leading-relaxed">
                    SCRO is a space for students interested in semiconductors, microelectronics, materials, fabrication, and related careers. <strong className="text-[#FFD51E]">You do not need prior experience to get involved.</strong>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whoShouldJoin.map((item) => (
                    <div key={item} className="rounded-xl border border-[rgba(255,213,30,0.2)] bg-[rgba(255,213,30,0.03)] p-4 text-sm text-[rgba(255,255,255,0.9)] font-medium flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FFD51E]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionMotion>

        {/* What to Expect */}
        <SectionMotion className="py-16 relative z-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">What to Expect</h2>
              <div className="h-1 w-20 bg-[#FFD51E] mx-auto mt-4 rounded-full opacity-50" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whatToExpect.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="group relative rounded-2xl border border-[rgba(255,213,30,0.1)] bg-[#0a0a0a] p-6 hover:bg-[#111] hover:border-[rgba(255,213,30,0.3)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-[rgba(255,213,30,0.1)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-[#FFD51E]" />
                    </div>
                    <h3 className="font-bold text-white text-lg tracking-tight mb-2">{item.title}</h3>
                    <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionMotion>

        {/* How to Get Involved */}
        <SectionMotion className="py-16 relative z-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Your Next Steps</h2>
            </div>
            <div className="space-y-4">
              {joinSteps.map((step, index) => (
                <div key={step.title} className="flex gap-6 rounded-2xl border border-[rgba(255,213,30,0.1)] bg-gradient-to-r from-[#0d0a00] to-[#050505] p-6 md:p-8 items-center">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(255,213,30,0.15)] border border-[#FFD51E] flex items-center justify-center text-[#FFD51E] font-black text-xl">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-[rgba(255,255,255,0.6)] text-base">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionMotion>

        {/* FAQ Section */}
        <SectionMotion className="py-16 relative z-10">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Got Questions?</h2>
            </div>
            <div className="rounded-2xl border border-[rgba(255,213,30,0.1)] bg-[#0a0a0a] p-6 md:p-8">
              <Accordion items={faqItems} />
            </div>
          </div>
        </SectionMotion>

        {/* CTA */}
        <SectionMotion className="py-20 relative z-10">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-[rgba(255,213,30,0.3)] bg-gradient-to-b from-[#1a1400] to-[#050505] px-6 py-16 text-center sm:px-10 shadow-[0_0_80px_rgba(255,213,30,0.05)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(255,213,30,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,213,30,0.15)] mx-auto flex items-center justify-center mb-6">
                <CheckCircle2Icon className="h-8 w-8 text-[#FFD51E]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">Ready to jump in?</h2>
              <p className="text-[rgba(255,255,255,0.7)] mb-8 text-lg">Join the Discord and say hello. We'll take it from there.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="https://discord.gg/F9PTT3FJFS" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#FFD51E] to-[#CCAA18] px-8 py-4 text-sm font-bold text-black shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all">
                  Join the Discord
                </a>
                <a href="mailto:scro.ucf@gmail.com" className="inline-flex items-center justify-center rounded-xl border border-[rgba(255,213,30,0.3)] bg-black px-8 py-4 text-sm font-bold text-[#FFD51E] hover:bg-[rgba(255,213,30,0.05)] transition-all">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </SectionMotion>
      </main>
      <Footer />
    </>
  );
}
