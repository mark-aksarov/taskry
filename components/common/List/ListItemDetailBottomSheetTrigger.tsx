"use client";

import { useOverlayTrigger } from "react-aria";
import { focusRing, RACButton } from "@/components/ui";
import { OverlayTriggerState, useOverlayTriggerState } from "react-stately";

interface ListItemDetailBottomSheetTriggerProps {
  title: string;
  renderBottomSheet: (state: OverlayTriggerState) => React.ReactNode;
}

export function ListItemDetailBottomSheetTrigger({
  title,
  renderBottomSheet,
}: ListItemDetailBottomSheetTriggerProps) {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <RACButton
        {...triggerProps}
        className={(renderProps) =>
          focusRing({
            ...renderProps,
            className: "max-w-full cursor-pointer truncate md:hidden",
          })
        }
      >
        {title}
      </RACButton>
      {renderBottomSheet(state)}
    </>
  );
}
