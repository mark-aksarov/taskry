"use client";

import { Item } from "react-stately";
import { Languages } from "lucide-react";
import {
  MenuTrigger,
  Button,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { NavigationButton } from "../common/NavigationButton";

const menuItems = [
  <Item textValue="Delete" key="delete">
    <img
      src={`https://flagcdn.com/gb.svg`}
      alt="English"
      className="w-[2rem]"
    />
    English
  </Item>,
  <Item textValue="Mark as Pending" key="pending">
    <img
      src={`https://flagcdn.com/ru.svg`}
      alt="Russian"
      className="w-[2rem]"
    />
    Russian
  </Item>,
];

export const LangMenuBottomSheetTrigger = () => {
  return (
    <MenuTrigger
      overlayType="bottomsheet"
      renderDialogHeader={() => (
        <DialogHeader>
          <DialogHeading>Language</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <NavigationButton>
          <Languages size={18} strokeWidth={1.5} absoluteStrokeWidth />
          English
        </NavigationButton>
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
