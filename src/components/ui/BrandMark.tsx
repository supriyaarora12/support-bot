type BrandMarkProps = {
  label?: string;
  monogram?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
} as const;

export function BrandMark({
  label,
  monogram = "S",
  size = "md",
  className = "",
}: BrandMarkProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-brand font-semibold text-white ${sizeClass[size]}`}
        aria-hidden={label ? true : undefined}
      >
        {monogram}
      </span>
      {label ? (
        <span className="hidden text-base font-semibold tracking-tight text-brand-deep min-[380px]:inline sm:text-lg">
          {label}
        </span>
      ) : null}
    </div>
  );
}
