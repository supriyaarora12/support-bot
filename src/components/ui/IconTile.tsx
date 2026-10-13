import type { ReactNode } from "react";

type IconTileProps = {
  title: string;
  body: string;
  icon?: ReactNode;
  className?: string;
};

export function IconTile({
  title,
  body,
  icon,
  className = "",
}: IconTileProps) {
  return (
    <article
      className={`group rounded-2xl border border-border/80 bg-surface/90 p-5 shadow-sm shadow-brand/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/10 sm:p-6 ${className}`}
    >
      {icon ? (
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-mint to-mint/40 text-brand ring-1 ring-brand/10 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
      ) : null}
      <h3 className="font-display text-base font-semibold text-brand-deep sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
        {body}
      </p>
    </article>
  );
}
