import {
  DetailInfo,
  DetailLink,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";

interface ProjectDetailAltProps {
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline: string;
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

export function ProjectDetailAlt({
  creator,
  deadline,
  description,
  customer,
  category,
  status,
}: ProjectDetailAltProps) {
  const tStatus = useTranslations("projects.ProjectStatus");
  const t = useTranslations("projects.ProjectDetail");

  const format = useFormatter();

  const formattedDeadline = format.dateTime(new Date(deadline), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <ProjectDetailAltLayout
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
      deadlineSlot={
        <DetailInfo>
          <DetailTitle>{t("deadline")}</DetailTitle>
          <DetailText>{formattedDeadline}</DetailText>
        </DetailInfo>
      }
      customerSlot={
        <DetailInfo>
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
      categorySlot={
        <DetailInfo>
          <DetailTitle>{t("category")}</DetailTitle>
          <DetailText>{category ? category.name : t("noCategory")}</DetailText>
        </DetailInfo>
      }
      creatorSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("creator")}</DetailTitle>
          {creator ? (
            <DetailLink href={`/team/${creator.id}`}>
              <DetailText>{creator.fullName}</DetailText>
            </DetailLink>
          ) : (
            <DetailText>{t("noCreator")}</DetailText>
          )}
        </DetailInfo>
      }
    />
  );
}
