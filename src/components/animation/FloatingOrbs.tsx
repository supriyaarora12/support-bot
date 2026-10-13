type FloatingOrbsProps = {
  tone?: "mint" | "brand";
  className?: string;
};

/** Soft static washes — no continuous blur animation (was heavy). */
export function FloatingOrbs({
  tone = "mint",
  className = "",
}: FloatingOrbsProps) {
  const a = tone === "mint" ? "bg-mint/40" : "bg-brand/10";
  const b = tone === "mint" ? "bg-mint-strong/10" : "bg-mint/20";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div
        className={`absolute -left-20 top-8 h-48 w-48 rounded-full blur-3xl ${a}`}
      />
      <div
        className={`absolute -right-16 bottom-6 h-56 w-56 rounded-full blur-3xl ${b}`}
      />
    </div>
  );
}
