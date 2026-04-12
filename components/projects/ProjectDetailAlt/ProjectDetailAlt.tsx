import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
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
        <DetailInfoAlt
          title={<DetailTitle>{t("description")}</DetailTitle>}
          text={
            <DetailText>
              {description ? description : t("noDescription")}
            </DetailText>
          }
          editButton={<DetailEditButton />}
        />
      }
      statusSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("status")}</DetailTitle>}
          text={<DetailText>{tStatus(status)}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      deadlineSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("deadline")}</DetailTitle>}
          text={formattedDeadline}
          editButton={<DetailEditButton />}
        />
      }
      customerSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("customer")}</DetailTitle>}
          text={
            customer ? (
              <DetailText>{customer.fullName}</DetailText>
            ) : (
              <DetailText>{t("noCustomer")}</DetailText>
            )
          }
          editButton={<DetailEditButton />}
        />
      }
      categorySlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("category")}</DetailTitle>}
          text={
            <DetailText>
              {category ? category.name : t("noCategory")}
            </DetailText>
          }
          editButton={<DetailEditButton />}
        />
      }
      creatorSlot={
        <DetailInfoAlt
          className="border-none pb-0"
          title={<DetailTitle>{t("creator")}</DetailTitle>}
          text={
            creator ? (
              <DetailText>{creator.fullName}</DetailText>
            ) : (
              <DetailText>{t("noCreator")}</DetailText>
            )
          }
        />
      }
    />
  );
}
