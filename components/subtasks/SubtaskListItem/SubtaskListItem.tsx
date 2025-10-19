"use client";

import { useMemo } from "react";
import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";

import { Button, Badge, Skeleton, Checkbox } from "@/components/ui";

import {
  ListItem,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";

import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { Subtask } from "@/generated/prisma";
import { twMerge } from "tailwind-merge";

export const SubtaskListItem = ({ subtask }: { subtask?: Subtask }) => {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!subtask?.deadline) return "";
    return new Date(subtask.deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [subtask?.deadline, locale]);

  const badgeStyles = "w-[5.5rem] px-0 @max-md:hidden";

  return (
    <ListItem>
      {subtask && <Checkbox aria-label="subtask checkbox" />}

      {/* --- Subtask Details --- */}
      {!subtask ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>{subtask.name}</ListItemTitle>
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      )}

      {/* --- Right side (menu) --- */}
      <div className="flex flex-none items-center justify-end gap-2">
        {/* --- Subtask Status --- */}
        {!subtask ? (
          <Skeleton className={twMerge(badgeStyles, "h-[1.75rem]")} />
        ) : (
          <Badge
            color={subtask.isDone ? "blue" : "green"}
            className={badgeStyles}
          >
            {subtask.isDone ? "Done" : "Active"}
          </Badge>
        )}
        {!subtask ? (
          <MenuTriggerSkeleton />
        ) : (
          <ResponsiveMenuTrigger
            placement="bottom right"
            renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
            renderButton={() => (
              <Button
                aria-label="subtask menu"
                variant="ghost"
                iconLeft={
                  <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
                }
                className="rounded-full"
              />
            )}
          >
            <Item textValue="Delete" key="delete">
              <Trash size={16} /> Delete
            </Item>
            <Item textValue="Mark as Pending" key="pending">
              <CircleEllipsis size={16} /> Mark as Pending
            </Item>
            <Item textValue="Mark as Done" key="done">
              <Check size={16} />
              Mark as Done
            </Item>
            <Item textValue="Mark as Active" key="active">
              <Clock size={16} />
              Mark as Active
            </Item>
          </ResponsiveMenuTrigger>
        )}
      </div>
    </ListItem>
  );
};
