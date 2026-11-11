import type React from "react";

/**
 * The `<a>` attributes a link component forwards: everything except `href`, `children` and
 * `className`, which the component sets itself. Includes `ref`, `aria-*`, `data-*`, `target`, `rel`,
 * `lang` and `hrefLang`.
 */
export type LinkAttributes = Omit<
  React.ComponentPropsWithRef<"a">,
  "href" | "children" | "className"
>;

/** The props a `LinkComponent` receives. */
export type LinkComponentProps = LinkAttributes & {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * What a component's `LinkComponent` prop accepts: a plain `"a"` (the default) or a component that
 * renders a link from `LinkComponentProps`, such as `next/link` (with typed routes, through a small wrapper: see the Consumers guide). A component that takes fewer props
 * is accepted too; it simply drops the attributes it does not render.
 */
export type LinkComponentType = "a" | React.ComponentType<LinkComponentProps>;
