"use client";

import { useMemo } from "react";
import { Item } from "react-stately";
import { Check, Clock, Ellipsis, Trash } from "lucide-react";

import { Button, Checkbox } from "@/components/ui";

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

  return (
    <ListItem className="border-gray-300 md:rounded-none md:pr-4 md:pl-6 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
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
    </ListItem>
  );
};
