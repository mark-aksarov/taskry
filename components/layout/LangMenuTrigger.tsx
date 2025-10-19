"use client";

import { Item } from "react-stately";
import { Languages } from "lucide-react";
import { MenuTrigger, Button } from "@/components/ui";
import { AppNavigationItem } from "./AppNavigation";
import { MenuDialogHeader } from "../common/MenuDialogHeader";

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
      renderDialogHeader={() => <MenuDialogHeader heading="Language" />}
      renderButton={() => (
        <AppNavigationItem>
          <Languages size={18} strokeWidth={1.5} absoluteStrokeWidth />
          English
        </AppNavigationItem>
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
