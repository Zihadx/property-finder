import * as React from "react";

/**
 * Minimal "asChild" slot: merges the wrapper's props/className onto its
 * single child instead of rendering an extra DOM node.
 */
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ children, className, ...props }, ref) => {
    if (!React.isValidElement(children)) return null;
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      ...props,
      ...child.props,
      className: [className, child.props.className].filter(Boolean).join(" "),
      ref,
    } as React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<HTMLElement> });
  }
);
Slot.displayName = "Slot";
