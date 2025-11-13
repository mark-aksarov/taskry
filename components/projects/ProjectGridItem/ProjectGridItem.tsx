"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Item } from "react-stately";
import { Checkbox, Button, Link } from "@/components/ui";
import {
  Check,
  CircleEllipsis,
  Clock,
  Ellipsis,
  MessageSquare,
  Trash,
} from "lucide-react";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import {
  GridItemInfo,
  GridItemProgress,
  GridItemText,
  GridItemTitle,
} from "@/components/common/Grid";
import { ImageContainer } from "@/components/common/ImageContainer";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ProjectGridItemLayout } from "./ProjectGridItemLayout";
import { ProjectStatusBadge } from "../ProjectStatusBadge";

export interface ProjectGridItemProps {
  id: number;
  title: string;
  deadline: Date;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  status: {
    id: number;
    name: string;
  };
  tasks: number;
  tasksDone: number;
  comments: number;
}

export function ProjectGridItem({
  id,
  title,
  deadline,
  creator,
  status,
  tasks,
  tasksDone,
  comments,
}: ProjectGridItemProps) {
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
    <ProjectGridItemLayout
      checkboxSlot={<Checkbox aria-label={title} />}
      menuTriggerSlot={
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
          <Item textValue="Mark as Competed" key="competed">
            <Check size={16} />
            Mark as Competed
          </Item>
          <Item textValue="Mark as Active" key="active">
            <Clock size={16} />
            Mark as Active
          </Item>
        </ResponsiveMenuTrigger>
      }
      titleSlot={
        <GridItemInfo className="flex-auto">
          <GridItemTitle>
            <Link className="block truncate" href={`/projects/${id}`}>
              {title}
            </Link>
          </GridItemTitle>
          <GridItemText>{`Deadline on ${formattedDeadline}`}</GridItemText>
        </GridItemInfo>
      }
      creatorImageSlot={
        creator?.imageUrl ? (
          <Link href={`/users/${creator.id}`}>
            <ImageContainer className="h-9 w-9">
              <Image fill src={creator.imageUrl} alt={creator.fullName} />
            </ImageContainer>
          </Link>
        ) : (
          <ImageContainer className="h-9 w-9" />
        )
      }
      commentsSlot={
        <Button
          variant="outlined"
          label={comments}
          iconLeft={
            <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full"
        />
      }
      statusSlot={<ProjectStatusBadge status={status} />}
      progressSlot={
        <GridItemProgress
          value={(tasksDone / tasks) * 100}
          showValueText={false}
          aria-label="project progress"
        />
      }
    />
  );
}
