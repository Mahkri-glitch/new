import {
  AtomIcon,
  BriefcaseBusinessIcon,
  HandshakeIcon,
  LightbulbIcon,
  MailIcon,
  MapPinIcon,
  MegaphoneIcon,
  RocketIcon,
  UsersIcon
} from '@/lib/icons';
import { type ComponentType, type SVGProps } from 'react';

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export type NavLink = {
  label: string;
  href: string;
};

export type ValueCard = {
  title: string;
  description: string;
  icon: IconType;
};

export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type BenefitCard = {
  title: string;
  description: string;
  icon: IconType;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type JoinStep = {
  title: string;
  description: string;
};

export type ContactLink = {
  label: string;
  href: string;
  icon: IconType;
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Events', href: '/#events' },
  { label: 'New Member Page', href: '/new-members' },
  { label: 'Contact Us', href: '/#contact' }
];

export const missionCards: ValueCard[] = [
  {
    title: 'Professional Development',
    description: 'Build confidence with resume support, interview readiness, and practical career guidance for the semiconductor space.',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Industry Exposure',
    description: 'Learn how semiconductor ecosystems work through speaker sessions, roadmap discussions, and real-world career insight.',
    icon: MegaphoneIcon
  },
  {
    title: 'Technical Learning',
    description: 'Explore microelectronics, devices, fabrication fundamentals, and materials in a student-friendly environment.',
    icon: AtomIcon
  },
  {
    title: 'Community',
    description: 'Connect with peers across majors who are serious about learning, building skills, and growing together.',
    icon: UsersIcon
  }
];

export const events: EventItem[] = [
  {
    title: 'First General Body Meeting',
    date: 'March 24th, 2026',
    time: '3:30 PM – 4:30 PM',
    location: 'UCF Research 1 Room 101',
    description: 'Meet SCRO @ UCF, learn about the club mission, upcoming opportunities, and how to get involved.',
    ctaLabel: 'RSVP on Discord',
    ctaHref: 'https://discord.gg/F9PTT3FJFS'
  },
  {
    title: 'Second General Body Meeting',
    date: 'April 14th, 2026',
    time: '5:00 PM - 6:30 PM',
    location: 'Classroom Building 1 Room 109',
    description: 'Fun event packed with officer elections, semiconductor pitch competition, a SkyWater speaker, and some free pizza to top it off.',
    ctaLabel: 'Get Event Details',
    ctaHref: 'https://discord.gg/F9PTT3FJFS'
  }
];

export const benefits: BenefitCard[] = [
  {
    title: 'Explore Semiconductor Careers',
    description: 'Understand pathways across design, process, materials, manufacturing, and emerging hardware roles.',
    icon: RocketIcon
  },
  {
    title: 'Build Professional Confidence',
    description: 'Gain practical communication and career readiness skills before internship and full-time recruiting seasons.',
    icon: HandshakeIcon
  },
  {
    title: 'Learn with a Motivated Community',
    description: 'Stay accountable with students who care about technical growth and long-term career development.',
    icon: UsersIcon
  },
  {
    title: 'Stay Connected to Opportunities',
    description: 'Discover club events, networking channels, and resources that keep you plugged into momentum.',
    icon: LightbulbIcon
  }
];

export const joinSteps: JoinStep[] = [
  { title: 'Join the Discord', description: 'Enter the main communication hub for announcements and conversations.' },
  { title: 'Attend an event', description: 'Show up to a meeting or session to understand the club rhythm and focus.' },
  { title: 'Introduce yourself', description: 'Share your interests, goals, and what you want to learn.' },
  { title: 'Stay engaged with meetings and opportunities', description: 'Keep participating and growing with the community.' }
];

export const checklistItems: string[] = [
  'Join the Discord',
  'Attend the next meeting',
  'Introduce yourself',
  'Stay updated on events',
  'Explore opportunities with the club'
];

export const faqItems: FaqItem[] = [
  {
    question: 'Do I need semiconductor experience?',
    answer: 'No. Beginners are welcome, and SCRO is designed to support students from their first steps onward.'
  },
  {
    question: 'What majors can join?',
    answer: 'Students from engineering, physics, chemistry, materials science, and other related fields can join.'
  },
  {
    question: 'How do I hear about events?',
    answer: 'Event announcements and reminders are shared through the club Discord and member communication channels.'
  },
  {
    question: 'Is the club only for advanced students?',
    answer: 'Not at all. SCRO supports students at every stage, from exploratory learners to advanced members.'
  },
  {
    question: 'How can I get more involved?',
    answer: 'Attend meetings consistently, participate in discussions, and volunteer when opportunities are posted.'
  }
];

export const contactLinks: ContactLink[] = [
  { label: 'Email: scro.ucf@gmail.com', href: 'mailto:scro.ucf@gmail.com', icon: MailIcon },
  { label: 'Discord: https://discord.gg/F9PTT3FJFS', href: 'https://discord.gg/F9PTT3FJFS', icon: MapPinIcon }
];

export const whoShouldJoin = [
  'Materials Science students',
  'Electrical Engineering students',
  'Mechanical Engineering students',
  'Physics students',
  'Chemistry students',
  'Anyone interested in semiconductor careers or technology'
];

export const whatToExpect: ValueCard[] = [
  {
    title: 'Club Meetings',
    description: 'Regular sessions that keep members informed, connected, and aligned on upcoming opportunities.',
    icon: UsersIcon
  },
  {
    title: 'Technical Exposure',
    description: 'Accessible discussions around semiconductor concepts, tools, and real-world applications.',
    icon: AtomIcon
  },
  {
    title: 'Professional Development',
    description: 'Career-focused sessions covering networking, internships, and preparation strategies.',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Community & Networking',
    description: 'A collaborative environment where students support each other academically and professionally.',
    icon: HandshakeIcon
  }
];
