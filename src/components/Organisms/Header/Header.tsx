import React from "react";
import { tv } from "tailwind-variants";
import { Container } from "../../Layouts/Container/Container.js";

export interface HeaderNavItem {
  label: string;
  href: string;
}

export interface HeaderProps {
  /**
   * Brand shown first, such as a logo or a name. Render it as a link yourself (for example to
   * the home page), so the component never guesses where "home" is.
   */
  brand: React.ReactNode;
  /**
   * Controls shown at the end, such as a search form, a cart link or a theme toggle. They stay
   * together, and drop below the brand when there is no room beside it.
   */
  actions?: React.ReactNode;
  /**
   * Links of the main navigation. They sit in one `<nav>` landmark (see `navLabel`): between the
   * brand and the actions from the `md` breakpoint up, and on a row of their own below it.
   * Without items no navigation is rendered.
   */
  navItems?: HeaderNavItem[];
  /**
   * Accessible name of the navigation landmark. Change it when the page has another navigation
   * with the same name, or to translate it.
   */
  navLabel?: string;
  /**
   * Component used to render each navigation link. Receives `href`, `className` and `children`,
   * so a framework link (e.g. `next/link`) can be passed directly. Defaults to a plain `<a>`.
   * Define it outside the render function: an inline definition remounts the links.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
  }>;
  className?: string;
}

const headerStyles = tv({
  base: "w-full bg-surface shadow-sm",
  slots: {
    inner: "flex min-h-16 flex-wrap items-center gap-x-6 gap-y-2 py-3",
    brand: "order-1",
    actions: "order-2 ml-auto flex items-center gap-2 md:order-3",
    nav: "order-3 w-full md:order-2 md:w-auto md:flex-1",
    list: "flex flex-wrap items-center gap-x-4 gap-y-1",
    link: "rounded-sm text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  },
});

/**
 * Page header: a `banner` landmark with a brand, an optional main navigation and a group of
 * actions. The bar is full-width and its content sits in a `Container`, so it lines up with page
 * content wrapped in one. It grows with its content instead of overflowing on a phone, and it
 * holds no state, so it renders from a Server Component.
 */
export const Header: React.FC<HeaderProps> = ({
  brand,
  actions,
  navItems = [],
  navLabel = "Main",
  LinkComponent = "a",
  className,
}) => {
  const styles = headerStyles();

  return (
    <header className={styles.base({ className })}>
      <Container className={styles.inner()}>
        <div className={styles.brand()}>{brand}</div>
        {actions && <div className={styles.actions()}>{actions}</div>}
        {navItems.length > 0 && (
          <nav aria-label={navLabel} className={styles.nav()}>
            <ul className={styles.list()}>
              {navItems.map(({ label, href }) => (
                <li key={`${label}-${href}`}>
                  <LinkComponent href={href} className={styles.link()}>
                    {label}
                  </LinkComponent>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
};
