"use client";

import { useMemo } from "react";
import { Link } from "@/components/ui";
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

  return (
    <ProjectListItemLayout
      checkboxSlot={showCheckbox && <Checkbox aria-label="project checkbox" />}
      titleSlot={
        <ListItemInfo>
          <ListItemTitle>
            <ItemBaseDetailModalTrigger
              title={title}
              modal={<ProjectDetailModal projectId={id} />}
            />
            <ItemBaseDetailBottomSheetTrigger
              title={title}
              renderBottomSheet={(state) => (
                <ProjectDetailBottomSheet projectId={id} state={state} />
              )}
            />
          </ListItemTitle>
          <ListItemText>{`Deadline on ${formattedDeadline}`}</ListItemText>
        </ListItemInfo>
      }
      creatorSlot={
        <>
          {creator?.imageUrl ? (
            <Link className="@max-2xl:hidden" href={`/users/${creator.id}`}>
              <ImageContainer className="h-9 w-9">
                <Image fill src={creator.imageUrl} alt={creator.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-9 w-9 @max-2xl:hidden" />
          )}

          <ListItemInfo className="@max-2xl:hidden">
            <ListItemTitle>
              {creator ? (
                <Link className="block truncate" href={`/users=${creator.id}`}>
                  {creator.fullName}
                </Link>
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
            <Link
              className="@max-3xl:hidden"
              href={`/customers/${customer.id}`}
            >
              <ImageContainer className="h-9 w-9">
                <Image fill src={customer.imageUrl} alt={customer.fullName} />
              </ImageContainer>
            </Link>
          ) : (
            <ImageContainer className="h-9 w-9 @max-3xl:hidden" />
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
          <ListItemTitle>
            <Link
              className="block truncate"
              href={`/categories=${category.id}`}
            >
              {category.name}
            </Link>
          </ListItemTitle>

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
        <ItemBaseButton
          label={comments}
          iconLeft={
            <MessageSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className="@max-md:hidden"
        />
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
