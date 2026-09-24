export function StaffPulseMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-primary" />
      <rect x="8" y="14" width="4" height="10" rx="1" className="fill-primary-fg" />
      <rect x="14" y="8" width="4" height="16" rx="1" className="fill-primary-fg" />
      <rect x="20" y="12" width="4" height="12" rx="1" className="fill-primary-fg" />
    </svg>
  );
}
