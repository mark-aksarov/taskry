import clsx from "clsx";
import React, { useMemo } from "react";
import { mergeRefs } from "@react-aria/utils";
import { OverlayTriggerState } from "react-stately";
import { OverlayTriggerStateContext } from "react-aria-components";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";

export type BottomSheetOwnProps = {
  state: OverlayTriggerState;
  className?: string;
  children: React.ReactNode;
};

export type BottomSheetProps = AriaModalOverlayProps &
  BottomSheetOwnProps &
  React.RefAttributes<HTMLDivElement>;

export const BottomSheet = ({
  state,
  className,
  children,
  ...props
}: BottomSheetProps) => {
  const ref = React.useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  const mergedRefs = useMemo(() => mergeRefs(props.ref, ref), [props.ref, ref]);

  return (
    <OverlayTriggerStateContext.Provider value={state}>
      <Overlay>
        <div
          data-testid="overlay"
          {...underlayProps}
          className="fixed inset-0 z-10 bg-black/20"
        >
          <div
            {...modalProps}
            ref={mergedRefs}
            className={clsx(
              "absolute bottom-0 left-0 w-full overflow-hidden rounded-t-2xl bg-white shadow-lg dark:bg-gray-800",
              className,
            )}
            data-testid="bottom-sheet"
          >
            {children}
          </div>
        </div>
      </Overlay>
    </OverlayTriggerStateContext.Provider>
  );
};
