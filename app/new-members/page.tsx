import { CheckCircle2Icon } from '@/lib/icons';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Accordion } from '@/components/ui/accordion';
import { faqItems, joinSteps, whatToExpect, whoShouldJoin } from '@/lib/data';

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 shadow-xl ${className}`}>
      {children}
    </div>
  );
}

export default function NewMembersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#FFD51E] selection:text-black">
        {/* Header */}
        <section className="py-16 sm:py-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
              Welcome to SCRO
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We're a community of students learning about semiconductors, microelectronics, and hardware engineering. It's awesome to meet you!
            </p>
          </div>
        </section>

        {/* Welcome & Who Should Join */}
        <section className="py-16 sm:py-24 border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-5xl px-6">
            <GlassCard>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white mb-4">You belong here.</h2>
                  <p className="text-zinc-400 leading-relaxed mb-6 text-lg">
                    Whether you're a freshman who just discovered what a semiconductor is or a senior building your own chips, SCRO is for everyone. <span className="text-white font-medium">You do not need any prior experience.</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whoShouldJoin.map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-zinc-200 flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#FFD51E] shadow-[0_0_8px_rgba(255,213,30,0.5)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 sm:py-24 border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center sm:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">What to Expect</h2>
              <p className="text-zinc-400 text-lg">Here's what goes down when you join the club.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whatToExpect.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Icon className="h-6 w-6 text-zinc-300" />
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Get Involved */}
        <section className="py-16 sm:py-24 border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center sm:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Your Next Steps</h2>
              <p className="text-zinc-400 text-lg">Getting involved is super easy.</p>
            </div>
            <div className="grid gap-4">
              {joinSteps.map((step, index) => (
                <div key={step.title} className="flex gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 items-center hover:bg-white/[0.04] hover:border-white/10 transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFD51E]/10 border border-[#FFD51E]/20 flex items-center justify-center font-bold text-base text-[#FFD51E]">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-zinc-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 border-b border-white/5 relative z-10">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Got Questions?</h2>
              <p className="text-zinc-400 text-lg">We've got answers.</p>
            </div>
            <GlassCard>
              <Accordion items={faqItems} />
            </GlassCard>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 relative z-10">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-8">
              <CheckCircle2Icon className="h-8 w-8 text-[#FFD51E]" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-white mb-6">Ready to jump in?</h2>
            <p className="text-zinc-400 mb-10 max-w-md mx-auto text-lg">Join the Discord and say hello. We'll let you know when the next meeting is!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://discord.gg/F9PTT3FJFS" className="inline-flex h-12 items-center justify-center rounded-full bg-[#FFD51E] px-8 text-base font-semibold text-black transition-all hover:bg-[#e6c01b] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,213,30,0.3)]">
                Join the Discord
              </a>
              <a href="mailto:scro.ucf@gmail.com" className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:text-white">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
