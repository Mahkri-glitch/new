import { CheckCircle2Icon } from '@/lib/icons';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { SectionMotion } from '@/components/section-motion';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { faqItems, joinSteps, whatToExpect, whoShouldJoin } from '@/lib/data';

export default function NewMembersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <SectionMotion className="bg-black py-16">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[var(--scro-white)] sm:text-5xl">New Member Page</h1>
            <p className="mt-4 text-sm text-[rgba(255,255,255,0.85)]">Everything you need to get started with SCRO @ UCF.</p>
          </div>
        </SectionMotion>

        <SectionMotion className="bg-[rgba(255,213,30,0.08)] py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-black">Welcome</h2>
            <p className="mt-3 text-sm text-[rgba(0,0,0,0.82)]">
              SCRO is a space for students interested in semiconductors, microelectronics, materials, fabrication, and
              related careers. You do not need prior experience to get involved.
            </p>
          </div>
        </SectionMotion>

        <SectionMotion className="bg-white py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-black">Who Should Join</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {whoShouldJoin.map((item) => (
                <div key={item} className="rounded-xl border border-[rgba(204,170,24,0.45)] bg-[rgba(255,213,30,0.1)] p-4 text-sm text-black">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 inline-flex rounded-full border border-[rgba(204,170,24,0.45)] bg-[rgba(255,213,30,0.2)] px-4 py-1 text-sm font-semibold text-black">
              Beginners are welcome.
            </p>
          </div>
        </SectionMotion>

        <SectionMotion className="bg-black py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--scro-white)]">What to Expect</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whatToExpect.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-xl border border-[rgba(255,213,30,0.35)] bg-[rgba(255,213,30,0.07)] p-5">
                    <Icon className="h-5 w-5 text-[var(--scro-gold)]" />
                    <h3 className="mt-2 font-semibold text-[var(--scro-white)]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[rgba(255,255,255,0.82)]">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionMotion>

        <SectionMotion className="bg-[rgba(255,213,30,0.08)] py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-black">How to Get Involved</h2>
            <ol className="mt-6 space-y-3">
              {joinSteps.map((step, index) => (
                <li key={step.title} className="flex gap-3 rounded-xl border border-[rgba(204,170,24,0.45)] bg-white p-4">
                  <span className="mt-0.5 text-sm font-bold text-[var(--scro-gold-dark)]">Step {index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-black">{step.title}</p>
                    <p className="text-sm text-[rgba(0,0,0,0.75)]">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SectionMotion>

        <SectionMotion className="bg-black py-14">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[var(--scro-white)]">FAQ</h2>
            <div className="mt-5">
              <Accordion items={faqItems} />
            </div>
          </div>
        </SectionMotion>

        <SectionMotion className="bg-black pb-20">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[rgba(255,213,30,0.35)] bg-[rgba(255,213,30,0.08)] px-6 py-9 text-center sm:px-10">
            <CheckCircle2Icon className="mx-auto h-8 w-8 text-[var(--scro-gold)]" />
            <h2 className="mt-3 text-2xl font-bold text-[var(--scro-white)]">Ready to get started?</h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="https://discord.gg/hFK2s8eh">Join the Discord</Button>
              <Button href="mailto:scro.ucf@gmail.com" variant="outline">
                Contact SCRO
              </Button>
            </div>
          </div>
        </SectionMotion>
      </main>
      <Footer />
    </>
  );
}
