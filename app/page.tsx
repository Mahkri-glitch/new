import { AboutSection } from '@/components/about-section';
import { ContactSection } from '@/components/contact-section';
import { EventsSection } from '@/components/events-section';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { Navbar } from '@/components/navbar';
import { NewMemberPreview } from '@/components/new-member-preview';
import { WhyJoinSection } from '@/components/why-join-section';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <EventsSection />
        <WhyJoinSection />
        <NewMemberPreview />
        <ContactSection />
      </main>
      <Footer />
    </>
import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/Button';
import { FeatureGrid } from '@/components/FeatureGrid';
import { SectionHeading } from '@/components/SectionHeading';
import { StatsRow } from '@/components/StatsRow';
import { TestimonialGrid } from '@/components/TestimonialGrid';
import type { Feature, Stat, Testimonial } from '@/components/types';

const features: Feature[] = [
  {
    title: 'Composable Architecture',
    description:
      'Build pages from modular React + TypeScript components with clearly scoped props and strong typing.',
    icon: <SparkIcon />
  },
  {
    title: 'Motion-Driven UX',
    description:
      'Use Framer Motion for tasteful transitions, scroll reveals, and micro-interactions without hurting performance.',
    icon: <MotionIcon />
  },
  {
    title: 'Production Baseline',
    description:
      'Includes strict TypeScript, linting, responsive layout tokens, and clean file organization for long-term scaling.',
    icon: <ShieldIcon />
  },
  {
    title: 'Responsive by Default',
    description:
      'Mobile-first Tailwind utility patterns ensure every section adapts from small phones to large desktop displays.',
    icon: <DevicesIcon />
  },
  {
    title: 'Reusable UI Kit',
    description:
      'Shared primitives like section wrappers, headings, cards, and CTA buttons keep implementation consistent.',
    icon: <BlocksIcon />
  },
  {
    title: 'Performance Focused',
    description:
      'Optimized rendering strategy with lightweight CSS and isolated client components for animated areas only.',
    icon: <BoltIcon />
  }
];

const stats: Stat[] = [
  { label: 'Lighthouse', value: '98+' },
  { label: 'Type Coverage', value: '100%' },
  { label: 'Motion Variants', value: '12' },
  { label: 'Reusable Blocks', value: '20+' }
];

const testimonials: Testimonial[] = [
  {
    name: 'Alyssa Jordan',
    role: 'Product Design Lead',
    quote:
      'This implementation gave our team a polished baseline UI in one sprint, with enough flexibility to customize quickly.'
  },
  {
    name: 'Marcus Chen',
    role: 'Frontend Architect',
    quote: 'Code quality is excellent: strict typing, reusable patterns, and animation that feels premium but not noisy.'
  },
  {
    name: 'Priya Kapoor',
    role: 'Growth Engineer',
    quote:
      'Our landing pages now ship faster because every section is componentized, responsive, and easy to A/B test.'
  }
];

export default function HomePage() {
  return (
    <main className="gradient-grid min-h-screen">
      <div className="container-x py-8 sm:py-12 lg:py-16">
        <AnimatedSection className="rounded-3xl border border-slate-800/90 bg-slate-900/70 p-8 sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">MotionCraft UI</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Full Next.js + TypeScript UI Implementation
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                A production-ready foundation powered by React, Tailwind CSS, and Framer Motion with reusable components,
                responsive layouts, and clean architecture.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="#features">Explore Features</Button>
                <Button href="#contact" variant="secondary">
                  Start Project
                </Button>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-7">
              <p className="text-sm font-medium text-slate-200">Delivery checklist</p>
              <ChecklistItem label="Typed component contracts" />
              <ChecklistItem label="Animation with reduced visual noise" />
              <ChecklistItem label="Responsive sections and spacing scale" />
              <ChecklistItem label="Polished dark theme + gradients" />
              <ChecklistItem label="Clear organization for future extension" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12" delay={0.05}>
          <StatsRow stats={stats} />
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.1}>
          <div id="features" className="space-y-8">
            <SectionHeading
              badge="Capabilities"
              title="Clean reusable component system"
              description="Each block can be dropped into product pages, marketing sites, or dashboards without rewriting core styling logic."
            />
            <FeatureGrid items={features} />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.1}>
          <SectionHeading
            badge="Testimonials"
            title="Trusted by product teams"
            description="The architecture is intentionally pragmatic so engineers can move quickly while keeping UX quality high."
          />
          <TestimonialGrid items={testimonials} />
        </AnimatedSection>

        <AnimatedSection className="mt-20" delay={0.15}>
          <div
            id="contact"
            className="rounded-3xl border border-indigo-400/30 bg-indigo-500/10 p-8 text-center sm:p-10 lg:p-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">Build Faster</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Ship your next UI with confidence.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-200">
              This implementation is ready for real projects with scalable patterns, polished visuals, and robust developer
              ergonomics.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="#">Book an Implementation Review</Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">✓</span>
      {label}
    </div>
  );
}

function SparkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="M12 2v5m0 10v5M2 12h5m10 0h5M5 5l3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19" />
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="M3 14c2-4 5-6 9-6s7 2 9 6M3 19c2-3 5-5 9-5s7 2 9 5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="M12 3 5 6v6c0 4.2 2.8 7.7 7 9 4.2-1.3 7-4.8 7-9V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </svg>
  );
}

function DevicesIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="6" width="13" height="11" rx="1.6" />
      <path d="M8 19h3" />
      <rect x="18" y="9" width="3" height="8" rx="0.8" />
    </svg>
  );
}

function BlocksIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="8" height="8" rx="1.2" />
      <rect x="13" y="3" width="8" height="8" rx="1.2" />
      <rect x="3" y="13" width="8" height="8" rx="1.2" />
      <rect x="13" y="13" width="8" height="8" rx="1.2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
      <path d="m13 2-7 10h5l-1 10 8-12h-5z" />
    </svg>
  );
}
