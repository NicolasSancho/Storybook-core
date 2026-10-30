import React from "react";
import { tv } from "tailwind-variants";
import { Icon, IconProps } from "../../Atoms/Icon/Icon.js";

export interface SidebarNavItem {
  /** Link text */
  label: string;
  /** Where the link goes. It needs no JavaScript. */
  href: string;
  /** Name of an icon shown before the label. It is decorative: the label names the link. */
  icon?: IconProps["name"];
  /**
   * Whether this is the page the user is on. It sets `aria-current="page"` and highlights the item.
   * The component cannot know the URL, so the app decides, usually with `usePathname`.
   */
  current?: boolean;
}

export interface SidebarNavProps {
  /** The links, in order */
  items: SidebarNavItem[];
  /** Accessible name of the navigation landmark. Name it when the page has more than one `nav`. */
  label?: string;
  /** Content above the links, for example the tenant's logo and name */
  header?: React.ReactNode;
  /**
   * Component used to render each link. Receives `href`, `className`, `children` and
   * `aria-current`, so a framework link (e.g. `next/link`) can be passed directly. Defaults to a
   * plain `<a>`. Define it outside the render function: an inline definition remounts the links.
   */
  LinkComponent?: React.ElementType<{
    href: string;
    children: React.ReactNode;
    className?: string;
    "aria-current"?: "page";
  }>;
  /** Additional classes for the wrapper */
  className?: string;
}

const sidebarNavStyles = tv({
  slots: {
    base: "flex flex-col gap-4",
    list: "flex flex-col gap-1",
    link: "flex items-center gap-2 rounded-sm border-l-2 px-3 py-2 text-sm font-medium text-neutral-900 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
  },
  variants: {
    current: {
      true: { link: "border-primary bg-primary/10" },
      false: { link: "border-transparent hover:bg-neutral-100" },
    },
  },
  defaultVariants: { current: false },
});

/**
 * The navigation list for an app's side panel: labelled links with an optional icon, and the current
 * page highlighted with the brand color. It has no width, position or collapse behavior of its own:
 * the app's layout decides those. Put it inside a `Popover` with `placement="drawer"` on narrow screens.
 */
export const SidebarNav: React.FC<SidebarNavProps> = ({
  items,
  label = "Main",
  header,
  LinkComponent = "a",
  className,
}) => {
  const styles = sidebarNavStyles();
  // When some items have an icon, the others reserve its space so every label lines up.
  const hasIcons = items.some(({ icon }) => icon);

  return (
    <div className={styles.base({ className })}>
      {header}
      <nav aria-label={label}>
        <ul className={styles.list()}>
          {items.map(({ label: text, href, icon, current }) => (
            <li key={href}>
              <LinkComponent
                href={href}
                className={sidebarNavStyles({ current: Boolean(current) }).link()}
                aria-current={current ? "page" : undefined}
              >
                {icon ? (
                  <Icon name={icon} size="small" />
                ) : (
                  hasIcons && <span aria-hidden="true" className="size-4 shrink-0" />
                )}
                <span>{text}</span>
              </LinkComponent>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
