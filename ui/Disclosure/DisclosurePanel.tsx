"use client";

import {
  composeRenderProps,
  DisclosurePanel as ReactAriaDisclosurePanel,
  type DisclosurePanelProps as ReactAriaDisclosurePanelProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

export interface DisclosurePanelProps extends ReactAriaDisclosurePanelProps {
  children: React.ReactNode;
}

export function DisclosurePanel({
  className,
  children,
  ...props
}: DisclosurePanelProps) {
  return (
    <ReactAriaDisclosurePanel
      {...props}
      className={composeRenderProps(className, (className) =>
        twMerge(
          "h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]",
          className,
        ),
      )}
    >
      <div>{children}</div>
    </ReactAriaDisclosurePanel>
  );
}
