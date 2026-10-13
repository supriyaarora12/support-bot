import "./motion.css";

type RunningBeamProps = {
  className?: string;
};

export function RunningBeam({ className = "" }: RunningBeamProps) {
  return (
    <div
      className={`pointer-events-none relative h-px w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-border" />
      <div className="absolute inset-y-0 left-0 w-1/3 sb-run-line" />
    </div>
  );
}
