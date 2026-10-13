import React from "react";
import { tv } from "tailwind-variants";
import { Text } from "../../Atoms/Text/Text";

export interface FooterColumn {
  /** Column heading, rendered as an `<h2>`. */
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface FooterProps {
  /**
   * Groups of links. They all sit inside one `<nav>` landmark (see `navLabel`), each under its
   * own heading. Without columns no navigation is rendered.
   */
  columns?: FooterColumn[];
  /** Brand block shown before the columns, such as a logo and a short description. */
  brand?: React.ReactNode;
  /** Legal line shown under a divider, such as the copyright. */
  legal?: React.ReactNode;
  /**
   * Component used to render each link. Receives `href`, `className` and `children`, so a
   * framework link (e.g. `next/link`) can be passed directly. Defaults to a plain `<a>`.
   * Define it outside the render function: an inline definition remounts the links.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  /**
   * Accessible name of the navigation landmark. Change it when the page has another navigation
   * with the same name, or to translate it.
   */
  navLabel?: string;
  className?: string;
}

const footerStyles = tv({
  base: "w-full border-t border-neutral-200 bg-surface",
  slots: {
    inner: "flex flex-col gap-8 px-4 py-10",
    top: "flex flex-col gap-8 md:flex-row md:justify-between",
    brand: "md:max-w-xs",
    columns: "flex flex-wrap gap-x-12 gap-y-8",
    list: "mt-3 flex flex-col gap-2",
    link: "rounded-sm text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    legal: "border-t border-neutral-200 pt-6 text-sm text-neutral-600",
  },
});

/**
 * Page footer: a `contentinfo` landmark with an optional brand block, link columns and a legal
 * line. It holds no state, so it renders from a Server Component.
 */
export const Footer: React.FC<FooterProps> = ({
  columns = [],
  brand,
  legal,
  LinkComponent = "a",
  navLabel = "Footer",
  className,
}) => {
  const styles = footerStyles();
  const hasColumns = columns.length > 0;

  return (
    <footer className={styles.base({ className })}>
      <div className={styles.inner()}>
        {(brand || hasColumns) && (
          <div className={styles.top()}>
            {brand && <div className={styles.brand()}>{brand}</div>}
            {hasColumns && (
              <nav aria-label={navLabel} className={styles.columns()}>
                {columns.map(({ title, links }) => (
                  <div key={title}>
                    <Text as="h2" size="small" weight="semibold" color="darker">
                      {title}
                    </Text>
                    <ul className={styles.list()}>
                      {links.map(({ label, href }) => (
                        <li key={`${label}-${href}`}>
                          <LinkComponent href={href} className={styles.link()}>
                            {label}
                          </LinkComponent>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>
        )}
        {legal && <div className={styles.legal()}>{legal}</div>}
      </div>
    </footer>
  );
};
