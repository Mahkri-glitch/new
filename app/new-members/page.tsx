export default function NewMembersPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen text-zinc-100 selection:bg-[#FFD51E] selection:text-black">
        {/* Header */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Welcome to SCRO
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We're a community of students learning about semiconductors, microelectronics, and hardware engineering. It's awesome to meet you!
            </p>
          </div>
        </section>

        {/* Welcome & Who Should Join */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="mx-auto max-w-5xl px-6">
            <DevCard>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-white mb-4">You belong here.</h2>
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    Whether you're a freshman who just discovered what a semiconductor is or a senior building your own chips, SCRO is for everyone. <span className="text-zinc-200 font-medium">You do not need any prior experience.</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {whoShouldJoin.map(item => (
                    <div key={item} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-sm font-medium text-zinc-300 flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFD51E]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </DevCard>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">What to Expect</h2>
              <p className="text-zinc-400">Here's what goes down when you join the club.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whatToExpect.map(item => ({
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-xl border border-zinc-800 bg-[#111] p-6 hover:border-zinc-700 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5 text-zinc-300" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How to Get Involved */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Your Next Steps</h2>
              <p className="text-zinc-400">Getting involved is super easy.</p>
            </div>
            <div className="grid gap-4">
              {joinSteps.map((step, index) => (
                <div key={step.title} className="flex gap-6 rounded-xl border border-zinc-800 bg-[#111] p-6 items-start hover:border-zinc-700 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-300">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-zinc-100 mb-1">{step.title}</h3>
                    <p className="text-sm text-zinc-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-24 border-b border-zinc-800">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Got Questions?</h2>
              <p className="text-zinc-400">We've got answers.</p>
            </div>
            <DevCard>
              <Accordion items={faqItems} />
            </DevCard>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 mx-auto flex items-center justify-center mb-6">
              <CheckCircle2Icon className="h-6 w-6 text-[#FFD51E]" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">Ready to jump in?</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">Join the Discord and say hello. We'll let you know when the next meeting is!</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://discord.gg/F9PTT3FJFS" className="inline-flex h-11 items-center justify-center rounded-bg-white px-8 text-sm font-semibold text-black transition-colors hover:bg-zinc-200">
                Join the Discord
              </a>
              <a href="mailto:scro.ucf@gmail.com" className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-800 bg-transparent px-8 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-white">
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