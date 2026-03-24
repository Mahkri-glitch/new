import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} {...props}>
      {children}
    </svg>
  );
}

export const MenuIcon = (props: IconProps) => <BaseIcon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></BaseIcon>;
export const XIcon = (props: IconProps) => <BaseIcon {...props}><path d="m6 6 12 12M18 6 6 18" /></BaseIcon>;
export const ChevronDownIcon = (props: IconProps) => <BaseIcon {...props}><path d="m6 9 6 6 6-6" /></BaseIcon>;
export const CalendarClockIcon = (props: IconProps) => <BaseIcon {...props}><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M7 2v4M13 2v4M3 9h14"/><circle cx="19" cy="17" r="3"/><path d="M19 15.8v1.6l1 1"/></BaseIcon>;
export const MapPinIcon = (props: IconProps) => <BaseIcon {...props}><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></BaseIcon>;
export const MailIcon = (props: IconProps) => <BaseIcon {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></BaseIcon>;
export const MessageCircleIcon = (props: IconProps) => <BaseIcon {...props}><path d="M20 11a8 8 0 1 1-3.2-6.4A8 8 0 0 1 20 11Z"/><path d="M8 19.5 6 22l.5-3"/></BaseIcon>;
export const CheckIcon = (props: IconProps) => <BaseIcon {...props}><path d="m5 12 4 4 10-10"/></BaseIcon>;
export const CheckCircle2Icon = (props: IconProps) => <BaseIcon {...props}><circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></BaseIcon>;
export const AtomIcon = (props: IconProps) => <BaseIcon {...props}><circle cx="12" cy="12" r="1"/><path d="M5 12c0-3 3-5 7-5s7 2 7 5-3 5-7 5-7-2-7-5Z"/><path d="M8 5c2 0 4 3 4 7s-2 7-4 7-4-3-4-7 2-7 4-7Z"/><path d="M16 5c2 0 4 3 4 7s-2 7-4 7-4-3-4-7 2-7 4-7Z"/></BaseIcon>;
export const BriefcaseBusinessIcon = (props: IconProps) => <BaseIcon {...props}><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V5h6v2M3 12h18"/></BaseIcon>;
export const HandshakeIcon = (props: IconProps) => <BaseIcon {...props}><path d="M8.5 12.5 5 9l-2 2 4.5 4.5M15.5 12.5 19 9l2 2-4.5 4.5"/><path d="m8.5 12.5 3-3 4 4"/></BaseIcon>;
export const LightbulbIcon = (props: IconProps) => <BaseIcon {...props}><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3 11c.7.5 1 1.3 1 2h4c0-.7.3-1.5 1-2A6 6 0 0 0 12 3Z"/></BaseIcon>;
export const MegaphoneIcon = (props: IconProps) => <BaseIcon {...props}><path d="m3 11 12-4v10L3 13Z"/><path d="M15 9h3a3 3 0 1 1 0 6h-3"/><path d="m7 14 1 4"/></BaseIcon>;
export const RocketIcon = (props: IconProps) => <BaseIcon {...props}><path d="M15 4c3 1 5 5 5 8-3 0-7 2-8 5-3-1-5-5-5-8 3 0 7-2 8-5Z"/><path d="m8 16-2 4 4-2"/></BaseIcon>;
export const UsersIcon = (props: IconProps) => <BaseIcon {...props}><circle cx="9" cy="8" r="2.5"/><circle cx="16" cy="9" r="2"/><path d="M4 18c0-2.5 2.5-4 5-4s5 1.5 5 4"/><path d="M14 18c0-1.7 1.6-3 3.5-3 1.1 0 2.1.4 2.8 1.1"/></BaseIcon>;
