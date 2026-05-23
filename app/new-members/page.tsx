import { CheckCircle2Icon } from '@/lib/icons';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Accordion } from '@/components/ui/accordion';
import { faqItems, joinSteps, whatToExpect, whoShouldJoin } from '@/lib/data';

function DevCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-scro-gold/10 bg-[#0a0a0a] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] ${className}`}>
      {children}
    </div>
  );
}

export default function NewMembersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-black text-zinc-100 selection:bg-scro-gold selection:text-black relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-scro-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header */}
        <section className="py-20 sm:py-32 border-b border-scro-gold/10 relative z-10">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-white mb-8 uppercase italic">
              Welcome to <span className="text-scro-gold">SCRO</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
              We&apos;re a community of students learning about semiconductors, microelectronics, and hardware engineering. <span className="text-white">It&apos;s awesome to meet you!</span>
            </p>
          </div>
        </section>

        {/* Welcome & Who Should Join */}
        <section className="py-20 sm:py-32 border-b border-scro-gold/10 relative z-10">
          <div className="mx-auto max-w-5xl px-6">
            <DevCard className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-scro-gold" />
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white mb-6">You belong here.</h2>
                  <p className="text-zinc-400 leading-relaxed mb-8 text-lg font-medium">
                    Whether you&apos;re a freshman who just discovered what a semiconductor is or a senior building your own chips, SCRO is for everyone. <span className="text-scro-gold font-bold">You do not need any prior experience.</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whoShouldJoin.map((item) => (
                    <div key={item} className="rounded-xl border border-scro-gold/10 bg-black p-5 text-sm font-bold text-zinc-300 flex items-center gap-4 hover:border-scro-gold/30 hover:text-scro-gold transition-all group">
                      <div className="w-2 h-2 rounded-full bg-scro-gold shadow-[0_0_8px_rgba(255,201,4,0.6)] group-hover:scale-125 transition-transform" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </DevCard>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-20 sm:py-32 border-b border-scro-gold/10 relative z-10">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 uppercase italic">What to Expect</h2>
              <p className="text-zinc-400 text-lg font-medium">Here&apos;s what goes down when you join the club.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {whatToExpect.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="group rounded-2xl border border-scro-gold/10 bg-[#0a0a0a] p-8 hover:border-scro-gold/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,201,4,0.15)]">
                    <div className="w-12 h-12 rounded-xl bg-scro-gold/10 border border-scro-gold/20 flex items-center justify-center mb-6 group-hover:bg-scro-gold group-hover:text-black transition-all">
                      <Icon className="h-6 w-6 text-scro-gold group-hover:text-black" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-scro-gold transition-colors">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-medium group-hover:text-zinc-300 transition-colors">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Get Involved */}
        <section className="py-20 sm:py-32 border-b border-scro-gold/10 relative z-10">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-16 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 uppercase italic">Your Next Steps</h2>
              <p className="text-zinc-400 text-lg font-medium">Getting involved is super easy.</p>
            </div>
            <div className="grid gap-6">
              {joinSteps.map((step, index) => (
                <div key={step.title} className="group flex gap-8 rounded-2xl border border-scro-gold/10 bg-[#0a0a0a] p-8 items-start hover:border-scro-gold/40 transition-all duration-300 hover:shadow-[0_15px_30px_-10px_rgba(255,201,4,0.1)]">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-scro-gold/10 border border-scro-gold/20 flex items-center justify-center font-black text-lg text-scro-gold group-hover:bg-scro-gold group-hover:text-black transition-all">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-scro-gold transition-colors">{step.title}</h3>
                    <p className="text-base text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-32 border-b border-scro-gold/10 relative z-10">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4 uppercase italic">Got Questions?</h2>
              <p className="text-zinc-400 text-lg font-medium">We&apos;ve got answers.</p>
            </div>
            <DevCard>
              <Accordion items={faqItems} />
            </DevCard>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 sm:py-48 relative z-10">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-scro-gold/10 border border-scro-gold/20 mx-auto flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,201,4,0.1)]">
              <CheckCircle2Icon className="h-8 w-8 text-scro-gold" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-6 uppercase italic">Ready to jump in?</h2>
            <p className="text-zinc-400 mb-12 max-w-md mx-auto text-lg font-medium leading-relaxed">Join the Discord and say hello. We&apos;ll let you know when the next meeting is!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="https://discord.gg/F9PTT3FJFS" 
                className="inline-flex h-14 items-center justify-center rounded-2xl bg-scro-gold px-10 text-base font-bold text-black transition-all hover:bg-scro-gold-dark hover:scale-105 shadow-[0_0_25px_rgba(255,201,4,0.3)] hover:shadow-[0_0_40px_rgba(255,201,4,0.5)]"
              >
                Join the Discord
              </a>
              <a 
                href="mailto:scro.ucf@gmail.com" 
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-scro-gold/30 bg-transparent px-10 text-base font-bold text-scro-gold transition-all hover:bg-scro-gold/10 hover:border-scro-gold"
              >
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
