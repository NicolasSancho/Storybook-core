import React from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../../Atoms/Icon/Icon";
import { Text } from "../../Atoms/Text/Text";

export interface BreadcrumbsProps {
  /**
   * Trail from the root to the current page. The first item renders as a home icon
   * (its label is kept for screen readers) and the last item is the current page.
   */
  items: {
    label: string;
    href?: string;
  }[];
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
  className?: string;
}

const breadcrumbsStyles = tv({
  base: "text-sm text-neutral-600",
  slots: {
    list: "flex items-center gap-1",
    item: "flex items-center gap-1",
    link: "no-underline text-inherit hover:underline text-primary",
    current: "text-neutral-600",
    separator: "text-neutral-400",
  },
});

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  LinkComponent = "a",
  className,
}) => {
  const styles = breadcrumbsStyles();

  return (
    <nav className={styles.base({ className })} aria-label="Breadcrumb">
      <ol className={styles.list()}>
        {items.map(({ label, href }, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          const content = isFirst ? (
            <>
              <Icon name="Home" size="small" color="primary" />
              <span className="sr-only">{label}</span>
            </>
          ) : isLast ? (
            label
          ) : (
            <Text as="span" size="small" color="primary">
              {label}
            </Text>
          );

          return (
            <li key={`${label}-${href ?? ""}`} className={styles.item()}>
              {!isFirst && (
                <span className={styles.separator()} aria-hidden="true">
                  /
                </span>
              )}
              {isLast ? (
                <span className={styles.current()} aria-current="page">
                  {content}
                </span>
              ) : (
                <LinkComponent href={href || "/"} className={styles.link()}>
                  {content}
                </LinkComponent>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
