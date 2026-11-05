import React from "react";
import { tv } from "tailwind-variants";

export interface TableSkeletonProps {
  /** Text for screen readers while the content loads, for example "Loading products". */
  label: string;
  /** Rows under the header row. */
  rows?: number;
  /** Bars in each row. */
  columns?: number;
  /** Additional classes for custom styling */
  className?: string;
}

const tableSkeletonStyles = tv({
  slots: {
    bars: "animate-pulse motion-reduce:animate-none",
    row: "flex h-10 items-center gap-6 border-b border-neutral-200 px-4 last:border-b-0",
    header: "bg-neutral-50",
    bar: "h-3 flex-1 rounded-sm bg-neutral-200",
  },
});

/** A placeholder for tabular content on first load. The bars are hidden from screen readers. */
export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  label,
  rows = 6,
  columns = 3,
  className,
}) => {
  const styles = tableSkeletonStyles();
  const bars = Array.from({ length: columns }, (_, column) => (
    <span key={column} className={styles.bar()} />
  ));

  return (
    <div className={className}>
      <p role="status" className="sr-only">
        {label}
      </p>
      <div aria-hidden="true" className={styles.bars()}>
        <div className={styles.row({ className: styles.header() })}>{bars}</div>
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className={styles.row()}>
            {bars}
          </div>
        ))}
      </div>
    </div>
  );
};
