import type { ReactNode } from "react";

type IconProps = { size?: number; className?: string };

function Stroke({
  size = 17,
  className,
  children,
  sw = 2,
  slc = "round" as "round" | "square" | "butt",
}: IconProps & { children: ReactNode; sw?: number; slc?: "round" | "square" | "butt" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap={slc}
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Fill({ size = 17, className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

export function IconCar({ size = 20, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </Stroke>
  );
}

export function IconSearch({ size = 19, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </Stroke>
  );
}

export function IconMenu({ size = 22, className }: IconProps) {
  return (
    <Stroke size={size} className={className} slc="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Stroke>
  );
}

export function IconClose({ size = 22, className }: IconProps) {
  return (
    <Stroke size={size} className={className} slc="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </Stroke>
  );
}

export function IconCalendar({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Stroke>
  );
}

export function IconGauge({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </Stroke>
  );
}

export function IconGear({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </Stroke>
  );
}

export function IconFuel({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M3 22V6a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v16" />
      <path d="M9 9h4M3 13h10" />
      <path d="M17 22V9l-3 3M17 5c1.5 0 3 1.5 3 4M18 2l2 2" />
    </Stroke>
  );
}

export function IconColor({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z" />
      <path d="M12 2a5 5 0 0 0 0 10 5 5 0 0 1 0 10" />
    </Stroke>
  );
}

export function IconShield({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </Stroke>
  );
}

export function IconMap({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Stroke>
  );
}

export function IconPhone({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </Stroke>
  );
}

export function IconMail({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </Stroke>
  );
}

export function IconWhatsapp({ size = 19, className }: IconProps) {
  return (
    <Fill size={size} className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </Fill>
  );
}

export function IconCheck({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className} sw={2.5}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  );
}

export function IconEdit({ size = 14, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
    </Stroke>
  );
}

export function IconTrash({ size = 14, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </Stroke>
  );
}

export function IconPlus({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className} sw={2.5}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

export function IconDashboard({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </Stroke>
  );
}

export function IconCar2({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </Stroke>
  );
}

export function IconBrand({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2Z" />
      <path d="M12 11 4.5 6.5M12 11l7.5-4.5M12 11v9" />
    </Stroke>
  );
}

export function IconImage({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </Stroke>
  );
}

export function IconSettings({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </Stroke>
  );
}

export function IconLogout({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </Stroke>
  );
}

export function IconEye({ size = 15, className }: IconProps) {
  return (
    <Stroke size={size} className={className} sw={2}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </Stroke>
  );
}

export function IconArrowLeft({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </Stroke>
  );
}

export function IconInstagram({ size = 17, className }: IconProps) {
  return (
    <Stroke size={size} className={className} sw={2}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </Stroke>
  );
}

export function IconFacebook({ size = 17, className }: IconProps) {
  return (
    <Fill size={size} className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </Fill>
  );
}

export function IconTiktok({ size = 17, className }: IconProps) {
  return (
    <Fill size={size} className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.045.88.13V9.4a6.34 6.34 0 0 0-1-.08A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </Fill>
  );
}

export function IconMoney({ size = 18, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </Stroke>
  );
}