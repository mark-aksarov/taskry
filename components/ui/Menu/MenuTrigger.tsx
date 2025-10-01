import React from "react";
import { Menu } from "./Menu";
import { Dialog } from "../Dialog";
import { Button } from "../Button";
import { BottomSheet } from "../BottomSheet";
import { Placement, Popover } from "../Popover";
import { useMenuTriggerState } from "react-stately";
import { PressResponder } from "@react-aria/interactions";
import { AriaMenuProps, useMenuTrigger } from "react-aria";
import type { MenuTriggerProps as RACMenuTriggerProps } from "react-stately";

export type MenuTriggerOwnProps = {
  overlayType?: "popover" | "bottomsheet";
  overlayClassName?: string;
  placement?: Placement;
  renderButton?: () => React.ReactNode;
  renderDialogHeader?: () => React.ReactNode;
};

export type MenuTriggerProps<T extends object = any> = AriaMenuProps<T> &
  RACMenuTriggerProps &
  MenuTriggerOwnProps;

export const MenuTrigger = <T extends object>({
  overlayType,
  overlayClassName,
  placement = "bottom left",
  renderButton,
  renderDialogHeader,
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

      {overlayType === "bottomsheet" ? (
        <BottomSheet
          isDismissable={true}
          state={state}
          className={overlayClassName}
        >
          <Dialog aria-labelledby={menuProps["aria-labelledby"]}>
            {renderDialogHeader && renderDialogHeader()}
            <Menu {...props} {...menuProps} />
          </Dialog>
        </BottomSheet>
      ) : (
        <Popover
          state={state}
          triggerRef={ref}
          placement={placement}
          className={overlayClassName}
        >
          <Dialog aria-labelledby={menuProps["aria-labelledby"]}>
            <Menu {...props} {...menuProps} />
          </Dialog>
        </Popover>
      )}
    </>
  );
};
