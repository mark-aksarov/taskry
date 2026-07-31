import Image from "next/image";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { UnknownUser } from "@/dashboard/common/UnknownUser";
import { OverdueBadge } from "@/dashboard/common/OverdueBadge";
import { DeadlineBadge } from "@/dashboard/common/DeadlineBadge";
import { ImageContainer } from "@/dashboard/common/ImageContainer";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { DetailInfo, DetailText, DetailTitle } from "@/dashboard/common/Detail";

interface ProjectDetailProps {
  title: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline: string;
  description?: string;
  client?: {
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
  title,
  creator,
  deadline,
  description,
  client,
  category,
  status,
}: ProjectDetailProps) {
  const tStatus = useTranslations("dashboard.projects.ProjectStatus");
  const t = useTranslations("dashboard.projects.ProjectDetail");

  const creatorImg = creator?.imageUrl ? (
    <ImageContainer className="h-9 w-9">
      <Image src={creator.imageUrl} alt="" width={36} height={36} />
    </ImageContainer>
  ) : (
    <UnknownUser className="h-9 w-9" />
  );

  return (
    <DeadlineProvider deadline={deadline} status={status}>
      <ProjectDetailLayout
        titleSlot={
          <h2 className="text-base font-bold text-(--text-primary)">{title}</h2>
        }
        overdueSlot={<OverdueBadge className="w-fit" />}
        creatorSlot={
          <DetailInfo>
            <DetailTitle>{t("creator")}</DetailTitle>
            <div className="flex items-center gap-2">
              {creator ? (
                <>
                  {creatorImg}
                  <DetailText>{creator.fullName}</DetailText>
                </>
              ) : (
                <>
                  <UnknownUser className="h-9 w-9" />
                  <DetailText>{t("noCreator")}</DetailText>
                </>
              )}
            </div>
          </DetailInfo>
        }
        deadlineSlot={
          <DetailInfo className="md:gap-3.5">
            <DetailTitle>{t("deadline")}</DetailTitle>
            <DeadlineBadge className="self-start" />
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
            <DetailText>
              {category ? category.name : t("noCategory")}
            </DetailText>
          </DetailInfo>
        }
        clientSlot={
          <DetailInfo className="border-none pb-0">
            <DetailTitle>{t("client")}</DetailTitle>
            {client ? (
              <DetailText>{client.fullName}</DetailText>
            ) : (
              <DetailText>{t("noClient")}</DetailText>
            )}
          </DetailInfo>
        }
      />
    </DeadlineProvider>
  );
}
