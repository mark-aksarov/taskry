import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";

import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { ProjectTitleDetailInfoAlt } from "./ProjectTitleDetailInfoAlt";
import { ProjectStatusDetailInfoAlt } from "./ProjectStatusDetailInfoAlt";
import { ProjectCategoryDetailInfoAlt } from "./ProjectCategoryDetailInfoAlt";
import { ProjectDeadlineDetailInfoAlt } from "./ProjectDeadlineDetailInfoAlt";
import { ProjectDescriptionDetailInfoAlt } from "./ProjectDescriptionDetailInfoAlt";

interface ProjectDetailAltProps {
  title: string;
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
  title,
  creator,
  deadline,
  description,
  customer,
  category,
  status,
}: ProjectDetailAltProps) {
  const t = useTranslations("projects.ProjectDetail");

  return (
    <ProjectDetailAltLayout
      titleSlot={<ProjectTitleDetailInfoAlt title={title} />}
      descriptionSlot={
        <ProjectDescriptionDetailInfoAlt description={description} />
      }
      statusSlot={<ProjectStatusDetailInfoAlt status={status} />}
      deadlineSlot={<ProjectDeadlineDetailInfoAlt deadline={deadline} />}
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
      categorySlot={<ProjectCategoryDetailInfoAlt category={category} />}
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
