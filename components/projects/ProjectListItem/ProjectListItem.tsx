"use client";

import { useMemo } from "react";
import { Badge, BadgeColor, Link } from "@/components/ui";
import {
  Check,
  CircleEllipsis,
  Clock,
  Ellipsis,
  MessageSquare,
  Trash,
} from "lucide-react";
import { Item } from "react-stately";
import { Checkbox, Button } from "@/components/ui";
import {
  ListItemImageInfo,
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List/index";
import { ResponsiveMenuTrigger } from "@/components/common/ResponsiveMenuTrigger";
import { MenuDialogHeader } from "@/components/common/MenuDialogHeader";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import Image from "next/image";
import { ProjectStatusBadge } from "../ProjectStatusBadge";

export interface ProjectListItemProps {
  id: number;
  title: string;
  deadline: Date;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  category: {
    id: number;
    name: string;
  };
  company?: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  comments: number;
  showCheckbox?: boolean;
}

export const ProjectListItem = ({
  id,
  title,
  deadline,
  category,
  customer,
  company,
  status,
  creator,
  comments,
  showCheckbox,
}: ProjectListItemProps) => {
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
    <ProjectListItemLayout
      checkboxSlot={showCheckbox && <Checkbox aria-label="project checkbox" />}
      titleSlot={
        <ListItemInfo>
          <ListItemTitle>
            <Link className="inline" href={`/projects/${id}`}>
              {title}
            </Link>
          </ListItemTitle>

          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      }
      creatorSlot={
        <ListItemImageInfo className="@max-2xl:hidden">
          {creator?.imageUrl ? (
            <Link href={`/users/${creator.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image fill src={creator.imageUrl} alt={creator.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-9 w-9" />
          )}
          <ListItemTitle>Creator</ListItemTitle>
          {creator ? (
            <ListItemText>
              <Link href={`/users=${creator.id}`}>{creator.fullName}</Link>
            </ListItemText>
          ) : (
            <ListItemText>Unknown creator</ListItemText>
          )}
        </ListItemImageInfo>
      }
      customerSlot={
        <ListItemImageInfo className="@max-3xl:hidden">
          {customer?.imageUrl ? (
            <Link href={`/customers/${customer.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image fill src={customer.imageUrl} alt={customer.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-9 w-9" />
          )}
          <ListItemTitle>Customer</ListItemTitle>

          {customer ? (
            <ListItemText>
              <Link className="inline" href={`/customers=${customer.id}`}>
                {customer.fullName}
              </Link>
            </ListItemText>
          ) : (
            <ListItemText>Unknown customer</ListItemText>
          )}
        </ListItemImageInfo>
      }
      categorySlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>Category</ListItemTitle>

          <ListItemText>
            <Link className="inline" href={`/categories=${category.id}`}>
              {category.name}
            </Link>
          </ListItemText>
        </ListItemInfo>
      }
      companySlot={
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemTitle>Company</ListItemTitle>

          <ListItemText>
            {company ? company.name : "Unknown company"}
          </ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ProjectStatusBadge
          className="w-[5.625rem] @max-md:hidden"
          status={status}
        />
      }
      commentsModalTriggerSlot={
        <Button
          variant="outlined"
          label={comments}
          iconLeft={
            <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="h-[1.75rem] w-[3.75rem] justify-center rounded-full @max-md:hidden"
        />
      }
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
    />
  );
};
