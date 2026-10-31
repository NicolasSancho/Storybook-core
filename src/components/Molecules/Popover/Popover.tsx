"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { buttonStyles } from "../../Atoms/Button/buttonStyles.js";
import { Icon } from "../../Atoms/Icon/Icon.js";

export interface PopoverProps {
  /** Content of the button that opens the panel: text, an icon, or both */
  trigger: React.ReactNode;
  /**
   * Accessible name for the trigger. Needed only when `trigger` has no text, for example an
   * icon-only button. It replaces the visible text for screen readers, so leave it out otherwise.
   */
  triggerLabel?: string;
  /** Style of the trigger button, one of the `Button` variants */
  variant?: "primary" | "secondary" | "text" | "outline";
  /** Size of the trigger button */
  size?: "small" | "medium" | "large";
  /**
   * Where the panel appears. `bottom-start` and `bottom-end` open a dropdown under the trigger,
   * aligned to its left or right edge. `drawer` slides a full-height panel in from the left edge of
   * the screen, with a dimmed backdrop. The drawer is not modal: keyboard focus can still leave it.
   */
  placement?: "bottom-start" | "bottom-end" | "drawer";
  /**
   * Accessible name of the close button that the `drawer` placement shows at the top of the panel,
   * for people who cannot press Esc or tap the dimmed area. Translate it for other languages. A
   * dropdown has no close button.
   */
  closeLabel?: string;
  /**
   * Panel content. It can be Server Components, so a navigation list or a form with a Server
   * Action stays on the server. Only the trigger button and the panel shell are client code.
   */
  children: React.ReactNode;
  /** Additional classes for the panel */
  className?: string;
}

const popoverStyles = tv({
  base: "m-0 border-neutral-200 bg-surface text-neutral-900",
  variants: {
    placement: {
      "bottom-start":
        "inset-auto w-max min-w-48 max-w-[calc(100vw-2rem)] rounded-lg border p-2 shadow-lg backdrop:bg-transparent",
      "bottom-end":
        "inset-auto w-max min-w-48 max-w-[calc(100vw-2rem)] rounded-lg border p-2 shadow-lg backdrop:bg-transparent",
      drawer:
        "inset-y-0 left-0 h-dvh w-72 max-w-[85vw] overflow-y-auto border-r p-0 shadow-lg backdrop:bg-black/40",
    },
  },
  defaultVariants: { placement: "bottom-start" },
});

const GAP = 4;

/**
 * A button that opens a panel using the browser's native `popover`. The browser handles closing on
 * an outside click and on Esc, returning focus to the button, and drawing the panel above the page.
 *
 * This is a client component. It adds what the native popover lacks: `aria-expanded` on the button,
 * closing when a link inside the panel is clicked or a form inside it is submitted, and placing a
 * dropdown under its button. Render it from a Server Component; every prop is serializable.
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  triggerLabel,
  variant = "outline",
  size = "medium",
  placement = "bottom-start",
  closeLabel = "Close menu",
  children,
  className,
}) => {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // A popover is drawn in the top layer, so it ignores its parent's position: place it from the
  // trigger's rectangle in the viewport.
  const place = useCallback(() => {
    const panel = panelRef.current;
    const button = triggerRef.current;
    if (!panel || !button || placement === "drawer") return;
    const rect = button.getBoundingClientRect();
    panel.style.top = `${rect.bottom + GAP}px`;
    if (placement === "bottom-end") {
      panel.style.left = "auto";
      panel.style.right = `${document.documentElement.clientWidth - rect.right}px`;
    } else {
      panel.style.right = "auto";
      panel.style.left = `${rect.left}px`;
    }
  }, [placement]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, place]);

  const closeOnNavigation = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      panelRef.current?.hidePopover();
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        popoverTarget={panelId}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={triggerLabel}
        className={buttonStyles({ variant, size })}
      >
        {trigger}
      </button>
      <div
        ref={panelRef}
        id={panelId}
        popover="auto"
        onBeforeToggle={(event) => {
          if (event.newState === "open") place();
        }}
        onToggle={(event) => setOpen(event.newState === "open")}
        onClick={closeOnNavigation}
        onSubmit={() => panelRef.current?.hidePopover()}
        className={popoverStyles({ placement, className })}
      >
        {placement === "drawer" && (
          <div className="flex justify-end p-2">
            <button
              type="button"
              popoverTarget={panelId}
              popoverTargetAction="hide"
              aria-label={closeLabel}
              className={buttonStyles({ variant: "outline", size: "small" })}
            >
              <Icon name="X" size="small" />
            </button>
          </div>
        )}
        {children}
      </div>
    </>
  );
};
