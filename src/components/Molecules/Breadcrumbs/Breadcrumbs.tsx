import React from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../../Atoms/Icon/Icon";

export interface BreadcrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
  LinkComponent: React.ElementType<{ to: string; children: React.ReactNode; className?: string }>;
  className?: string;
}

const breadcrumbsStyles = tv({
  base: "flex items-center gap-1 text-sm text-gray-600",
  slots: {
    item: "flex items-center gap-1",
    link: "no-underline text-inherit hover:underline text-primary",
    separator: "text-gray-400",
  },
});

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  LinkComponent,
  className,
}) => {
  const styles = breadcrumbsStyles();

  return (
    <nav className={`${styles.base()} ${className}`} aria-label="Breadcrumb">
      {items.map(({ label, href }, index) => {
        const isFirst = index === 0;

        return (
          <React.Fragment key={index}>
            {!isFirst && <span className={styles.separator()}>/</span>}
            <LinkComponent to={href || "/"} className={styles.link()}>
              {isFirst ? (
                <Icon name="Home" size="small" color="primary" />
              ) : (
                label
              )}
            </LinkComponent>
          </React.Fragment>
        );
      })}
    </nav>
  );
};
