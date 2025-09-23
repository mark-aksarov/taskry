import { Button as RACButton } from "react-aria-components";
import { Item, useOverlayTriggerState } from "react-stately";
import { Languages } from "lucide-react";
import { MenuTrigger } from "../ui/Menu";
import { DialogHeader } from "../ui/Dialog";
import { navLinkStyle } from "./AppNavigation";
import { useOverlayTrigger } from "react-aria";
import { Button } from "../ui/Button";

const itemClasses = "flex items-center gap-4 font-semibold";

const menuItems = [
  <Item textValue="Delete" key="delete">
    <div className={itemClasses}>
      <img
        src={`https://flagcdn.com/gb.svg`}
        alt="English"
        className="w-[2rem]"
      />
      English
    </div>
  </Item>,
  <Item textValue="Mark as Pending" key="pending">
    <div className={itemClasses}>
      <img
        src={`https://flagcdn.com/ru.svg`}
        alt="Russian"
        className="w-[2rem]"
      />
      Russian
    </div>
  </Item>,
];

export const LangMenuTriggerWithBottomSheet = () => {
  return (
    <MenuTrigger
      overlayType="bottomsheet"
      renderDialogHeader={() => (
        <DialogHeader className="px-4 py-3" titleClassName="text-base">
          Language
        </DialogHeader>
      )}
      renderButton={() => (
        <RACButton className={navLinkStyle}>
          <Languages size={18} strokeWidth={1.5} absoluteStrokeWidth />
          English
        </RACButton>
      )}
    >
      {menuItems}
    </MenuTrigger>
  );
};

export const LangMenuTriggerWithPopover = () => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <MenuTrigger
      renderButton={() => (
        <Button
          {...triggerProps}
          aria-label="language"
          variant="ghost"
          iconLeft={
            <Languages size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="rounded-full p-3"
        />
      )}
      placement="bottom right"
    >
      {menuItems}
    </MenuTrigger>
  );
};
