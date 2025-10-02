import { Button as RACButton } from "react-aria-components";
import { Item } from "react-stately";
import { Languages } from "lucide-react";
import { MenuTrigger } from "../ui/Menu";
import { DialogHeader } from "../ui/Dialog";
import { navLinkStyle } from "./AppNavigation";
import { Button } from "../ui/Button";
import { DialogCloseButton, DialogHeading } from "../ui/Dialog";

const itemClasses = "flex items-center gap-4 font-bold";

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

export const LangMenuBottomSheetTrigger = () => {
  return (
    <MenuTrigger
      overlayType="bottomsheet"
      renderDialogHeader={() => (
        <DialogHeader className="px-4 py-3">
          <DialogHeading className="text-base">Language</DialogHeading>
          <DialogCloseButton />
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

export const LangMenuPopoverTrigger = () => {
  return (
    <MenuTrigger
      renderButton={() => (
        <Button
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
