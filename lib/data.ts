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
  { label: 'Officers', href: '/officers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'New Member Page', href: '/new-members' },
  { label: 'Contact Us', href: '/#contact' }
];

export const missionCards: ValueCard[] = [
  {
    title: 'Professional Development',
    description: 'Get help with your resume, practice for interviews, and figure out how to actually land a job in the semiconductor industry.',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Industry Exposure',
    description: 'Hear directly from professionals working in the field. We bring in guest speakers and talk about what it\'s really like out there.',
    icon: MegaphoneIcon
  },
  {
    title: 'Technical Learning',
    description: 'Learn the basics of microelectronics, fabrication, and materials science without the stress of a graded class.',
    icon: AtomIcon
  },
  {
    title: 'Community',
    description: 'Hang out and network with other engineering and science majors who are trying to get their foot in the door.',
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
    ctaLabel: 'View in Gallery',
    ctaHref: '/gallery'
  },
  {
    title: 'Second General Body Meeting',
    date: 'April 14th, 2026',
    time: '5:00 PM - 6:30 PM',
    location: 'Classroom Building 1 Room 109',
    description: 'Officer elections for 2026–27, a speaker from SkyWater, a semiconductor pitch competition, and free pizza.',
    ctaLabel: 'View in Gallery',
    ctaHref: '/gallery'
  }
];

export const benefits: BenefitCard[] = [
  {
    title: 'Explore Semiconductor Careers',
    description: 'Find out what kind of jobs are actually out there—whether you want to do design, manufacturing, or materials research.',
    icon: RocketIcon
  },
  {
    title: 'Get Ready for Recruiting',
    description: 'Brush up on your networking and interview skills before the big career fairs and internship application drops.',
    icon: HandshakeIcon
  },
  {
    title: 'Meet Like-Minded Students',
    description: 'Join a group of people who are just as driven as you are about getting into the hardware and semiconductor space.',
    icon: UsersIcon
  },
  {
    title: 'Find Opportunities',
    description: 'We share job postings, internships, research opportunities, and upcoming networking events in our Discord.',
    icon: LightbulbIcon
  }
];

export const joinSteps: JoinStep[] = [
  { title: 'Join our Discord', description: 'This is where we post all our announcements, meeting times, and job opportunities.' },
  { title: 'Come to a meeting', description: 'Stop by one of our GBMs or workshops to see what we\'re all about.' },
  { title: 'Introduce yourself', description: 'Let us know what your major is and what kind of stuff you\'re interested in.' },
  { title: 'Stay active', description: 'Keep coming to events, ask questions, and hang out with the community.' }
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
    question: 'Do I need any prior experience?',
    answer: 'Not at all! We welcome everyone, whether you\'re a freshman who just heard the word "semiconductor" today or a senior working on a research project.'
  },
  {
    question: 'What majors can join?',
    answer: 'Most of our members are in Electrical Engineering, Materials Science, Physics, or Chemistry, but literally anyone interested can join.'
  },
  {
    question: 'How do I hear about events?',
    answer: 'Make sure you join our Discord! We post all our meeting times, locations, and updates in the announcements channel.'
  },
  {
    question: 'Is there a membership fee?',
    answer: 'Nope, joining SCRO is completely free. Just show up to our meetings and get involved.'
  },
  {
    question: 'How can I get more involved?',
    answer: 'The best way is to come to our meetings, ask questions when we have guest speakers, and chat with people in the Discord.'
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
    title: 'General Body Meetings',
    description: 'We meet regularly to go over club updates, talk about the industry, and hang out.',
    icon: UsersIcon
  },
  {
    title: 'Technical Deep Dives',
    description: 'We break down complicated semiconductor topics so they actually make sense, even if you haven\'t taken the upper-level classes yet.',
    icon: AtomIcon
  },
  {
    title: 'Career Prep',
    description: 'Workshops focused on fixing your resume, prepping for technical interviews, and applying for internships.',
    icon: BriefcaseBusinessIcon
  },
  {
    title: 'Networking',
    description: 'Meet alumni, recruiters, and other students who can help you figure out your career path.',
    icon: HandshakeIcon
  }
];
