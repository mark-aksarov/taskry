"use client";

import {
  ListItem,
  ListItemInfo,
  ListItemInfoSkeleton,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { MenuTriggerSkeleton } from "@/components/common/MenuTriggerSkeleton";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { Button, Checkbox } from "@/components/ui";
import { Attachment } from "@/generated/prisma";
import { Download, Ellipsis, Pencil, Trash } from "lucide-react";
import { Item } from "react-stately";

export function AttachmentListItem({
  attachment,
}: {
  attachment?: Attachment;
}) {
  return (
    <ListItem className="border-gray-300 md:rounded-none md:pr-4 md:pl-6 md:shadow-none md:not-last:border-b-1 dark:border-gray-600">
      {attachment && <Checkbox aria-label="attachment checkbox" />}

      {/* --- Attachment Details --- */}
      {!attachment ? (
        <ListItemInfoSkeleton />
      ) : (
        <ListItemInfo>
          <ListItemTitle>{attachment.fileName}</ListItemTitle>
          <ListItemText>150 MB</ListItemText>
        </ListItemInfo>
      )}

      {/* --- Right side (menu) --- */}
      <div className="flex flex-none items-center justify-end gap-2">
        {!attachment ? (
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
            <Item textValue="Download" key="download">
              <Download size={16} /> Download
            </Item>
            <Item textValue="Edit" key="edit">
              <Pencil size={16} /> Edit
            </Item>
            <Item textValue="Delete" key="delete">
              <Trash size={16} /> Delete
            </Item>
          </ResponsiveMenuTrigger>
        )}
      </div>
    </ListItem>
  );
}
