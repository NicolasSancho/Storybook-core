import React from "react";
import { tv } from "../../styles/tv.js";
import { focusRing } from "../../styles/focusRing.js";
import type { LinkComponentType } from "../../types/linkComponent.js";

export interface SidebarNavItem {
  /** Link text */
  label: string;
  /** Where the link goes. It needs no JavaScript. */
  href: string;
  /**
   * An icon shown before the label, such as an SVG from an icon library. The element passed is sized
   * to 16px and hidden from screen readers, because the label names the link.
   */
  icon?: React.ReactNode;
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
  LinkComponent?: LinkComponentType;
  /** Additional classes for the wrapper */
  className?: string;
}

const sidebarNavStyles = tv({
  slots: {
    base: "flex flex-col gap-4",
    list: "flex flex-col gap-1",
    icon: "flex size-4 shrink-0 items-center justify-center *:size-4",
    link: [
      "flex items-center gap-2 rounded-sm border-l-2 px-3 py-2 text-sm font-medium text-neutral-900",
      focusRing,
    ],
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
                {(icon || hasIcons) && (
                  <span aria-hidden="true" className={styles.icon()}>
                    {icon}
                  </span>
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
