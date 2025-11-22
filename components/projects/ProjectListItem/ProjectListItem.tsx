"use client";

import { useMemo } from "react";
import { Link, RACDialogTrigger } from "@/components/ui";
import {
  Check,
  CircleEllipsis,
  Clock,
  MessageSquare,
  Trash,
} from "lucide-react";
import { Item } from "react-stately";
import { Checkbox } from "@/components/ui";
import {
  ListItemInfo,
  ListItemText,
  ListItemTitle,
} from "@/components/common/List/index";
import { ProjectListItemLayout } from "./ProjectListItemLayout";
import { ImageContainer } from "@/components/common/ImageContainer";
import Image from "next/image";
import {
  ItemBaseActionMenuTrigger,
  ItemBaseBadge,
  ItemBaseButton,
  ItemBaseDetailBottomSheetTrigger,
  ItemBaseDetailModalTrigger,
} from "@/components/common/ItemBase";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectDetailBottomSheet } from "../ProjectDetailBottomSheet";
import { getProjectStatusBadgeColor } from "../getProjectStatusBadgeColor";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { UnknownUser } from "@/components/common/UnknownUser";
import { UserDetailModal } from "@/components/users/UserDetailModal";

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
    id: string;
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

  const creatorImg = creator?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={creator.imageUrl} alt={creator.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ProjectListItemLayout
      checkboxSlot={showCheckbox && <Checkbox aria-label="project checkbox" />}
      titleSlot={
        <ListItemInfo>
          <ListItemTitle>
            <ItemBaseDetailModalTrigger
              modal={<ProjectDetailModal projectId={id} />}
              className="truncate"
            >
              {title}
            </ItemBaseDetailModalTrigger>

            <ItemBaseDetailBottomSheetTrigger
              renderBottomSheet={(state) => (
                <ProjectDetailBottomSheet projectId={id} state={state} />
              )}
              className="truncate"
            >
              {title}
            </ItemBaseDetailBottomSheetTrigger>
          </ListItemTitle>
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      }
      creatorSlot={
        <>
          {creator ? (
            <ItemBaseDetailModalTrigger
              modal={<UserDetailModal userId={creator.id} />}
              className="@max-2xl:hidden"
            >
              {creatorImg}
            </ItemBaseDetailModalTrigger>
          ) : (
            <UnknownUser className="h-9 w-9 @max-2xl:hidden" />
          )}

          <ListItemInfo className="@max-2xl:hidden">
            <ListItemTitle>
              {creator ? (
                <ItemBaseDetailModalTrigger
                  modal={<UserDetailModal userId={creator.id} />}
                  className="truncate"
                >
                  {creator.fullName}
                </ItemBaseDetailModalTrigger>
              ) : (
                "Unknown creator"
              )}
            </ListItemTitle>
            <ListItemText>Creator</ListItemText>
          </ListItemInfo>
        </>
      }
      customerSlot={
        <>
          {customer?.imageUrl ? (
            <ImageContainer className="h-9 w-9 @max-3xl:hidden">
              <Image fill src={customer.imageUrl} alt={customer.fullName} />
            </ImageContainer>
          ) : (
            <UnknownUser className="h-9 w-9 @max-3xl:hidden" />
          )}

          <ListItemInfo className="@max-3xl:hidden">
            <ListItemTitle>
              {customer ? (
                <Link
                  className="block truncate"
                  href={`/customers=${customer.id}`}
                >
                  {customer.fullName}
                </Link>
              ) : (
                "Unknown customer"
              )}
            </ListItemTitle>

            <ListItemText>Customer</ListItemText>
          </ListItemInfo>
        </>
      }
      categorySlot={
        <ListItemInfo className="@max-4xl:hidden">
          <ListItemTitle>{category.name}</ListItemTitle>

          <ListItemText>Category</ListItemText>
        </ListItemInfo>
      }
      companySlot={
        <ListItemInfo className="@max-5xl:hidden">
          <ListItemTitle>
            {company ? company.name : "Unknown company"}
          </ListItemTitle>

          <ListItemText>Company</ListItemText>
        </ListItemInfo>
      }
      statusSlot={
        <ItemBaseBadge
          className="@max-lg:hidden"
          color={getProjectStatusBadgeColor(status.id)}
        >
          {status.name}
        </ItemBaseBadge>
      }
      commentsModalTriggerSlot={
        <RACDialogTrigger>
          <ItemBaseButton
            label={comments}
            iconLeft={
              <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
            }
          />
          <ProjectCommentsModal projectId={id} />
        </RACDialogTrigger>
      }
      menuTriggerSlot={
        <ItemBaseActionMenuTrigger>
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
        </ItemBaseActionMenuTrigger>
      }
    />
  );
};
