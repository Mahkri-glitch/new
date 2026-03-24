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
  );
}
