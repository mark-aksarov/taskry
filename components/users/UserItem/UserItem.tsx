"use client";

import { BaseItem } from "@/components/common/BaseItem";
import { Button } from "@/components/ui/Button";
import { DialogHeader } from "@/components/ui/Dialog";
import { MenuTrigger } from "@/components/ui/Menu";
import { Skeleton } from "@/components/ui/Skeleton";
import { User } from "@/generated/prisma";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import { Item } from "react-stately";
import { twMerge } from "tailwind-merge";

export function UserItem({ user }: { user?: User }) {
  const itemClasses = "flex items-center gap-4 font-bold";

  const renderButton = (className?: string) => (
    <Button
      aria-label="task item menu"
      variant="ghost"
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className={twMerge("shrink-0 grow-0 rounded-full", className)}
    />
  );

  const menuItems = [
    <Item textValue="Edit" key="pending">
      <div className={itemClasses}>
        <Pencil size={16} /> Edit
      </div>
    </Item>,
    <Item textValue="Delete" key="done">
      <div className={itemClasses}>
        <Trash size={16} />
        Delete
      </div>
    </Item>,
  ];

  const actionsMenu = (
    <>
      <MenuTrigger
        overlayType="bottomsheet"
        renderDialogHeader={() => (
          <DialogHeader className="px-4 py-3" titleClassName="text-base">
            Actions
          </DialogHeader>
        )}
        renderButton={() => renderButton("md:hidden")}
      >
        {menuItems}
      </MenuTrigger>
      <MenuTrigger
        renderButton={() => renderButton("max-md:hidden")}
        placement="bottom right"
      >
        {menuItems}
      </MenuTrigger>
    </>
  );

  const imageClasses =
    "h-9 w-9 shrink-0 grow-0 rounded-full bg-gray-200 overflow-hidden";

  return (
    <BaseItem className="justify-between gap-3">
      <div className="flex items-center justify-between gap-3">
        {user ? (
          <div className={imageClasses}>
            {user.imageUrl && (
              <Image
                width={36}
                height={36}
                src={user.imageUrl}
                alt={user.name}
              />
            )}
          </div>
        ) : (
          <Skeleton className={imageClasses} />
        )}
        <div className="flex flex-col gap-1">
          {user ? (
            <>
              <span className="text-sm font-bold text-black dark:text-white">
                {user.name}
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
            </>
          ) : (
            <>
              <Skeleton className="w-[7rem]" size="sm" />
              <Skeleton className="w-75/100" size="xs" />
            </>
          )}
        </div>
      </div>
      {user ? (
        actionsMenu
      ) : (
        <div className="p-2">
          <Skeleton className="h-1 w-4" />
        </div>
      )}
    </BaseItem>
  );
}
