import React from "react";
import { Menu } from "./Menu";
import { Dialog } from "../Dialog";
import { Popover } from "../Popover";
import { BottomSheet } from "../BottomSheet";
import { useMenuTriggerState } from "react-stately";
import type { MenuTriggerProps as RACMenuTriggerProps } from "react-stately";
import { PressResponder } from "@react-aria/interactions";
import { AriaMenuProps, Placement, useMenuTrigger } from "react-aria";
import { Button } from "../Button";

export type MenuTriggerOwnProps = {
  overlayType?: "popover" | "bottomsheet";
  placement?: Placement;
  renderButton?: () => React.ReactNode;
};

export type MenuTriggerProps<T extends object = any> = AriaMenuProps<T> &
  RACMenuTriggerProps &
  MenuTriggerOwnProps;

export const MenuTrigger = <T extends object>({
  overlayType,
  placement = "bottom start",
  renderButton,
  ...props
}: MenuTriggerProps<T>) => {
  const state = useMenuTriggerState(props);

  const ref = React.useRef<HTMLButtonElement | null>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

  return (
    <>
      <PressResponder {...menuTriggerProps} ref={ref} isPressed={state.isOpen}>
        {renderButton ? renderButton() : <Button label="Menu" />}
      </PressResponder>

      {state.isOpen &&
        (overlayType === "bottomsheet" ? (
          <BottomSheet
            state={state}
            aria-labelledby={menuProps["aria-labelledby"]}
          >
            <Menu {...props} {...menuProps} />
          </BottomSheet>
        ) : (
          <Popover state={state} triggerRef={ref} placement={placement}>
            <Dialog aria-labelledby={menuProps["aria-labelledby"]}>
              <Menu {...props} {...menuProps} />
            </Dialog>
          </Popover>
        ))}
    </>
  );
};
