'use client';

import React from 'react';
import {
  IoCalendarOutline,
  IoPeopleOutline,
  IoCameraOutline,
  IoMailOutline,
  IoLogoDiscord,
} from 'react-icons/io5';

const menuItems = [
  {
    title: 'Events',
    icon: <IoCalendarOutline />,
    href: '/#events',
    gradientFrom: '#FFB800',
    gradientTo: '#CC6600',
    external: false,
  },
  {
    title: 'Officers',
    icon: <IoPeopleOutline />,
    href: '/officers',
    gradientFrom: '#FFD51E',
    gradientTo: '#CCAA00',
    external: false,
  },
  {
    title: 'Gallery',
    icon: <IoCameraOutline />,
    href: '/gallery',
    gradientFrom: '#FFD51E',
    gradientTo: '#806000',
    external: false,
  },
  {
    title: 'Contact',
    icon: <IoMailOutline />,
    href: '/#contact',
    gradientFrom: '#F5C400',
    gradientTo: '#8B6914',
    external: false,
  },
  {
    title: 'Discord',
    icon: <IoLogoDiscord />,
    href: 'https://discord.gg/F9PTT3FJFS',
    gradientFrom: '#5865F2',
    gradientTo: '#3B45CC',
    external: true,
  },
];

export default function GradientMenu() {
  return (
    <ul className="flex gap-2.5">
      {menuItems.map(({ title, icon, href, gradientFrom, gradientTo, external }, idx) => (
        <li
          key={idx}
          style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
          className="relative w-[48px] h-[48px] bg-[rgba(12,12,12,0.85)] border border-[rgba(255,213,30,0.18)] shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-full flex items-center justify-center transition-all duration-500 hover:w-[140px] hover:shadow-none hover:border-transparent group cursor-pointer backdrop-blur-md overflow-hidden"
        >
          {/* Gradient fill on hover */}
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none" />
          {/* Glow */}
          <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[14px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-40 pointer-events-none" />

          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={title}
          >
            {/* Icon — shrinks on hover */}
            <span className="relative z-10 flex items-center justify-center transition-all duration-300 group-hover:scale-0 group-hover:opacity-0">
              <span className="text-[1.2rem] text-[rgba(255,213,30,0.8)]">{icon}</span>
            </span>

            {/* Label — appears on hover */}
            <span className="absolute z-10 text-white font-semibold text-[0.7rem] tracking-widest uppercase transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 delay-100 whitespace-nowrap select-none">
              {title}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
