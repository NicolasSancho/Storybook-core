import React from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../../Atoms/Icon/Icon.js";

export interface AlertProps {
  /**
   * The kind of message. Only `error` exists for now: it uses the danger colors and the
   * `alert` role, so assistive technology announces it when it appears.
   */
  variant?: "error";
  /** What happened, in a few words. It is announced first. */
  title: string;
  /** More detail, for example what the user can do next */
  children?: React.ReactNode;
  /** An element shown beside the message, usually a `Button` such as "Retry" */
  action?: React.ReactNode;
  /** Additional classes for custom styling */
  className?: string;
}

const alertStyles = tv({
  slots: {
    base: "flex flex-wrap items-start gap-3 rounded-lg border p-4",
    icon: "mt-0.5 shrink-0",
    content: "min-w-0 flex-1",
    title: "text-sm font-semibold",
    body: "mt-1 text-sm text-neutral-900",
    action: "shrink-0",
  },
  variants: {
    variant: {
      error: {
        base: "border-danger bg-danger-subtle",
        title: "text-danger",
      },
    },
  },
  defaultVariants: { variant: "error" },
});

/**
 * A message about the result of an action, such as a failed sign-in or a page that could not load.
 * It is announced to screen readers when it appears in the page.
 */
export const Alert: React.FC<AlertProps> = ({
  variant = "error",
  title,
  children,
  action,
  className,
}) => {
  const styles = alertStyles({ variant });

  return (
    <div role="alert" className={styles.base({ className })}>
      <span className={styles.icon()}>
        <Icon name="AlertCircle" size="small" color="danger" />
      </span>
      <div className={styles.content()}>
        <p className={styles.title()}>{title}</p>
        {children && <div className={styles.body()}>{children}</div>}
      </div>
      {action && <div className={styles.action()}>{action}</div>}
    </div>
  );
};
