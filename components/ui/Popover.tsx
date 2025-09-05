import clsx from "clsx";
import React from "react";
import type { AriaPopoverProps } from "react-aria";
import type { OverlayTriggerState } from "react-stately";
import { DismissButton, Overlay, usePopover } from "react-aria";

interface PopoverOwnProps {
  children: React.ReactNode;
  state: OverlayTriggerState;
  className?: string;
  style?: React.CSSProperties;
}

type PopoverProps = Omit<AriaPopoverProps, "popoverRef"> & PopoverOwnProps;

export const Popover = ({
  children,
  state,
  className,
  style,
  ...props
}: PopoverProps) => {
  const popoverRef = React.useRef(null);
  const { popoverProps, underlayProps } = usePopover(
    {
      ...props,
      offset: 8,
      popoverRef,
    },
    state,
  );

  return (
    <Overlay>
      <div {...underlayProps} style={{ position: "fixed", inset: 0 }} />
      <div
        {...popoverProps}
        ref={popoverRef}
        style={{
          ...popoverProps.style,
          ...style,
        }}
        className={clsx(
          "overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800",
          className,
        )}
        data-testid="popover"
      >
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
};
