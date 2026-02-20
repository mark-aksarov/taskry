import {
  DetailInfo,
  DetailLink,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";

interface ProjectDetailProps {
  id: number;
  title: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline?: Date;
  description?: string;
  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  category?: {
    id: number;
    name: string;
  };
  status: ProjectStatus;
}

export function ProjectDetail({
  id,
  title,
  creator,
  deadline,
  description,
  customer,
  category,
  status,
}: ProjectDetailProps) {
  const tStatus = useTranslations("projects.ProjectStatus");
  const t = useTranslations("projects.ProjectDetail");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

  const creatorImg = creator?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image fill src={creator.imageUrl} alt={creator.fullName} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <ProjectDetailLayout
      titleSlot={
        <h2 className="text-base font-bold text-black dark:text-white">
          {title}
        </h2>
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>{t("creator")}</DetailTitle>
          {creator ? (
            <DetailLink
              href={`/team/${creator.id}`}
              className="flex items-center gap-2"
            >
              {creatorImg}
              <DetailText>{creator.fullName}</DetailText>
            </DetailLink>
          ) : (
            <div className="flex items-center gap-2">
              {creatorImg}
              <DetailText>{t("noCreator")}</DetailText>
            </div>
          )}
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo className="md:gap-3.5">
          <DetailTitle>{t("deadline")}</DetailTitle>
          <Badge color="gray" className="self-start">
            {formattedDeadline}
          </Badge>
        </DetailInfo>
      }
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>{t("description")}</DetailTitle>
          <DetailText>
            {description ? description : t("noDescription")}
          </DetailText>
        </DetailInfo>
      }
      statusSlot={
        <DetailInfo>
          <DetailTitle>{t("status")}</DetailTitle>
          <DetailText>{tStatus(status)}</DetailText>
        </DetailInfo>
      }
      categorySlot={
        <DetailInfo>
          <DetailTitle>{t("category")}</DetailTitle>
          <DetailText>{category ? category.name : t("noCategory")}</DetailText>
        </DetailInfo>
      }
      customerSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("customer")}</DetailTitle>
          {customer ? (
            <DetailLink href={`/customers/${customer.id}`}>
              <DetailText>{customer.fullName}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noCustomer")}</DetailText>
          )}
        </DetailInfo>
      }
    />
  );
}
