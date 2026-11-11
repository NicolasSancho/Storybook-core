import React from "react";
import { tv } from "../../styles/tv.js";
import { focusRing } from "../../styles/focusRing.js";
import { Icon } from "../../Atoms/Icon/Icon.js";
import type { LinkComponentType } from "../../types/linkComponent.js";

export interface TableProps {
  /** Accessible name of the scroll region, for example "Products table". */
  label: string;
  /**
   * The table's name, hidden visually. Say how the rows are ordered and which columns sort, because
   * a screen reader announces `aria-sort` only on the sorted column.
   */
  caption: string;
  /** `TableHead` and `TableBody`. */
  children: React.ReactNode;
  /** Additional classes for the `<table>` element */
  className?: string;
}

export interface TableSectionProps {
  /** `TableRow` elements. */
  children: React.ReactNode;
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Column name. */
  children: React.ReactNode;
  /** Where the header link goes. Setting it makes the column sortable. */
  href?: string;
  /** Set on the sorted column only. It sets `aria-sort` and shows the direction. */
  sort?: "ascending" | "descending";
  /** Text alignment. Use `right` for numbers. */
  align?: "left" | "right";
  /**
   * Component used to render the header link. Receives `href`, `className` and `children`, so a
   * framework link (e.g. `next/link`) can be passed directly. Defaults to a plain `<a>`. Define it
   * outside the render function: an inline definition remounts the link.
   */
  LinkComponent?: LinkComponentType;
  /** Additional classes for custom styling */
  className?: string;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Text alignment. `right` also lines digits up, for numbers. */
  align?: "left" | "right";
}

const tableStyles = tv({
  slots: {
    region:
      "overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary",
    table: "w-full text-sm",
  },
});

const headStyles = tv({ base: "border-b border-neutral-200 text-left text-neutral-700" });

const rowStyles = tv({ base: "h-10 border-b border-neutral-200 last:border-b-0" });

const headerCellStyles = tv({
  slots: {
    cell: "h-10 whitespace-nowrap bg-neutral-50 px-4 font-medium",
    label: "inline-flex items-center gap-1",
    link: ["inline-flex items-center gap-1 rounded-sm hover:text-neutral-900", focusRing],
  },
  variants: {
    align: {
      left: { cell: "text-left" },
      right: { cell: "text-right" },
    },
  },
  defaultVariants: { align: "left" },
});

const cellStyles = tv({
  base: "whitespace-nowrap px-4 text-neutral-900",
  variants: {
    align: {
      left: "text-left",
      right: "text-right tabular-nums",
    },
  },
  defaultVariants: { align: "left" },
});

/** Up and down chevrons: the column can sort but is not sorted now. */
const SortableIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="h-3.5 w-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 9l4-4 4 4" />
    <path d="M16 15l-4 4-4-4" />
  </svg>
);

/**
 * A data table in a labelled scroll region that the keyboard can reach. Build it from `TableHead`,
 * `TableBody`, `TableRow`, `TableHeaderCell` and `TableCell`. Set a minimum width with `className`
 * when the columns need one: below it the table scrolls.
 */
export const Table: React.FC<TableProps> = ({ label, caption, children, className }) => {
  const styles = tableStyles();

  return (
    <div role="region" aria-label={label} tabIndex={0} className={styles.region()}>
      <table className={styles.table({ className })}>
        <caption className="sr-only">{caption}</caption>
        {children}
      </table>
    </div>
  );
};

/** The header section of a `Table`. */
export const TableHead: React.FC<TableSectionProps> = ({ children }) => (
  <thead className={headStyles()}>{children}</thead>
);

/** The body section of a `Table`. */
export const TableBody: React.FC<TableSectionProps> = ({ children }) => <tbody>{children}</tbody>;

/** A row of a `Table`. */
export const TableRow: React.FC<TableRowProps> = ({ className, ...props }) => (
  <tr {...props} className={rowStyles({ className })} />
);

/**
 * A column header. With `href` it is a sort link, which needs no JavaScript: the app works out the
 * URL and passes `sort` on the sorted column.
 */
export const TableHeaderCell: React.FC<TableHeaderCellProps> = ({
  children,
  href,
  sort,
  align,
  LinkComponent = "a",
  className,
  scope = "col",
  ...props
}) => {
  const styles = headerCellStyles({ align });
  const sortIcon = sort && (
    <span className={sort === "ascending" ? "rotate-180" : undefined}>
      <Icon name="ArrowDown" size="small" />
    </span>
  );

  return (
    <th {...props} scope={scope} aria-sort={sort} className={styles.cell({ className })}>
      {href ? (
        <LinkComponent href={href} className={styles.link()}>
          {children}
          {sortIcon ?? <SortableIcon />}
        </LinkComponent>
      ) : (
        <span className={styles.label()}>
          {children}
          {sortIcon}
        </span>
      )}
    </th>
  );
};

/** A data cell of a `Table`. */
export const TableCell: React.FC<TableCellProps> = ({ align, className, ...props }) => (
  <td {...props} className={cellStyles({ align, className })} />
);
