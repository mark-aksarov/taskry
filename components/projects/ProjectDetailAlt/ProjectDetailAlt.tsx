import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import Image from "next/image";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailAltLayout } from "./ProjectDetailAltLayout";
import { Attachment, Attachments } from "@/components/attachments/Attachments";

interface ProjectDetailAltProps {
  id: number;
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
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
}

export function ProjectDetailAlt({
  id,
  creator,
  deadline,
  description,
  customer,
  category,
  status,
  attachments,
}: ProjectDetailAltProps) {
  const t = useTranslations("projects.ProjectDetail");
  const tStatus = useTranslations("projects.ProjectStatus");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

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
          <DetailText>
            {customer ? customer.fullName : t("noCustomer")}
          </DetailText>
        </DetailInfo>
      }
      categorySlot={
        <DetailInfo>
          <DetailTitle>{t("category")}</DetailTitle>
          <DetailText>{category ? category.name : t("noCategory")}</DetailText>
        </DetailInfo>
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>{t("creator")}</DetailTitle>
          <DetailText>{creator ? creator.fullName : t("noCreator")}</DetailText>
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>{t("attachments")}</DetailTitle>
          {attachments.length > 0 && (
            <Attachments>
              {attachments.map((attachment) => (
                <Attachment key={attachment.id}>
                  <Image
                    src={attachment.fileUrl}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </Attachment>
              ))}
            </Attachments>
          )}
        </DetailInfo>
      }
    />
  );
}
