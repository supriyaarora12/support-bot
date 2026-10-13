import type { ReactNode } from "react";
import type { LandingItem } from "@/content/landing";
import { IconTile } from "./IconTile";

type FeatureGridProps = {
  items: LandingItem[];
  columns?: 2 | 3 | 4;
  renderIcon?: (item: LandingItem, index: number) => ReactNode;
  className?: string;
};

const columnClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

export function FeatureGrid({
  items,
  columns = 3,
  renderIcon,
  className = "",
}: FeatureGridProps) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columnClass[columns]} ${className}`}>
      {items.map((item, index) => (
        <IconTile
          key={item.title}
          title={item.title}
          body={item.body}
          icon={renderIcon?.(item, index)}
        />
      ))}
    </div>
  );
}
