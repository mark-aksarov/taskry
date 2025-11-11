"use client";

import {
  GridItem,
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
  GridItemTop,
} from "@/components/common/Grid";

import { Item } from "react-stately";
import { Check, CircleEllipsis, Clock, Ellipsis, Trash } from "lucide-react";

import { useMemo } from "react";
import {
  Button,
  Link,
  Checkbox,
  RACButton,
  focusRing,
  RACDialogTrigger,
} from "@/components/ui";
import Image from "next/image";
import { TaskDetailModal } from "../TaskDetailModal";
import { ImageContainer } from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";

export interface TaskGridItemProps {
  id: number;
  title: string;
  deadline?: Date;

  totalSubtasks?: number;
  subtasksDone?: number;

  creator?: {
    id: string;
    imageUrl?: string;
    fullName: string;
  };
}

export function TaskGridItem({
  id,
  title,
  deadline,
  totalSubtasks,
  subtasksDone,
  creator,
}: TaskGridItemProps) {
  const locale = "en-GB";

  const formattedDeadline = useMemo(() => {
    if (!deadline) return "";
    return new Date(deadline).toLocaleDateString(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [deadline, locale]);

  return (
    <GridItem>
      <GridItemTop>
        <Checkbox aria-label={title} />
        <ResponsiveMenuTrigger
          placement="bottom right"
          renderDialogHeader={() => <MenuDialogHeader heading="Actions" />}
          renderButton={() => (
            <Button
              aria-label="project menu"
              variant="ghost"
              iconLeft={
                <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className="-mr-2 rounded-full"
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
      </GridItemTop>

      <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-4">
        <GridItemInfo className="max-sm:w-full max-sm:items-center sm:flex-auto">
          <GridItemTitle>
            <RACDialogTrigger>
              <RACButton
                className={(renderProps) =>
                  focusRing({ ...renderProps, className: "cursor-pointer" })
                }
              >
                {title}
              </RACButton>
              <TaskDetailModal taskId={id} />
            </RACDialogTrigger>
          </GridItemTitle>

          <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
        </GridItemInfo>

        {creator?.imageUrl ? (
          <Link href={`/users/${creator.id}`}>
            <ImageContainer className="h-9 w-9">
              <Image fill src={creator.imageUrl} alt={creator.fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-9 w-9" />
        )}
      </div>

      <GridItemProgress
        value={((subtasksDone || 0) / (totalSubtasks || 1)) * 100}
        showValueText={false}
        aria-label="task progress"
      />
    </GridItem>
  );
}
