import React from "react";
import { tv } from "tailwind-variants";

export interface EmptyStateProps {
  /** What is empty, for example "No products yet." */
  title: string;
  /** What to do next. */
  description?: string;
  /** Slot under the text, usually a `ButtonLink`. */
  action?: React.ReactNode;
  /** Additional classes for custom styling */
  className?: string;
}

const emptyStateStyles = tv({
  slots: {
    base: "px-4 py-12 text-center",
    title: "font-medium text-neutral-900",
    description: "mt-1 text-sm text-neutral-600",
    action: "mt-4",
  },
});

/** The message shown in place of a list that has nothing to show. */
export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  className,
}) => {
  const styles = emptyStateStyles();

  return (
    <div className={styles.base({ className })}>
      <p className={styles.title()}>{title}</p>
      {description && <p className={styles.description()}>{description}</p>}
      {action && <div className={styles.action()}>{action}</div>}
    </div>
  );
};
