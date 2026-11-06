import React from "react";
import { tv } from "tailwind-variants";
import { linkStyles } from "../../styles/linkStyles.js";

export interface PaginationProps {
  /**
   * Current page, from 1 to the last page. The app handles a page outside that range and shows an
   * empty state instead of this component when there are no items.
   */
  page: number;
  /** Number of items across all pages. */
  totalItems: number;
  /** Items per page. */
  pageSize: number;
  /**
   * URL of the previous page. Without it the link is left out, as on the first page. Plain strings
   * rather than a function, so a Server Component can pass them through a client component.
   */
  previousHref?: string;
  /** URL of the next page. Without it the link is left out, as on the last page. */
  nextHref?: string;
  /**
   * Component used to render the links. Receives `href`, `className` and `children`, so a
   * framework link (e.g. `next/link`) can be passed directly. Defaults to a plain `<a>`. Define it
   * outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  /** Additional classes for custom styling */
  className?: string;
}

const paginationStyles = tv({
  slots: {
    base: "flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600",
    nav: "flex items-center gap-3",
    link: linkStyles({ variant: "inline" }),
  },
});

/** Links to the previous and next page, with the range shown. It needs no JavaScript. */
export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalItems,
  pageSize,
  previousHref,
  nextHref,
  LinkComponent = "a",
  className,
}) => {
  const styles = paginationStyles();
  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalItems);
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className={styles.base({ className })}>
      <p>
        {first}–{last} of {totalItems}
      </p>
      {(previousHref || nextHref) && (
        <nav aria-label="Pagination" className={styles.nav()}>
          {previousHref && (
            <LinkComponent href={previousHref} className={styles.link()}>
              Previous<span className="sr-only"> page</span>
            </LinkComponent>
          )}
          <span>
            Page {page} of {totalPages}
          </span>
          {nextHref && (
            <LinkComponent href={nextHref} className={styles.link()}>
              Next<span className="sr-only"> page</span>
            </LinkComponent>
          )}
        </nav>
      )}
    </div>
  );
};
