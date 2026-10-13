type StatusBadgeProps = {
  label?: string;
  className?: string;
};

export function StatusBadge({
  label = "Ready",
  className = "",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1 text-xs font-medium text-brand-deep ${className}`}
    >
      <span
        className="h-2 w-2 rounded-full bg-mint-strong motion-safe:animate-pulse"
        aria-hidden
      />
      {label}
    </span>
  );
}
