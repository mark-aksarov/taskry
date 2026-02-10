import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import Image from "next/image";
import { Link } from "@/components/ui/Link";
import { Badge } from "@/components/ui/Badge";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
import { UnknownUser } from "@/components/common/UnknownUser";
import { ImageContainer } from "@/components/common/ImageContainer";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { ProjectDetailStatusMenuTrigger } from "./ProjectDetailStatusMenuTrigger";

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
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
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
  attachments,
}: ProjectDetailProps) {
  const t = useTranslations("projects.ProjectDetail");

  const format = useFormatter();

  const formattedDeadline = deadline
    ? format.dateTime(new Date(deadline), {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : t("noDeadline");

  return (
    <ProjectDetailLayout
      titleSlot={
        <h2 className="text-base font-bold text-black dark:text-white">
          {title}
        </h2>
      }
      actionsSlot={<ProjectDetailStatusMenuTrigger />}
      creatorSlot={
        <DetailInfo>
          <DetailTitle>{t("creator")}</DetailTitle>
          <div className="flex items-center gap-2">
            {creator?.imageUrl ? (
              <Link href={`/users/${id}`}>
                <ImageContainer className="h-9 w-9">
                  <Image fill src={creator.imageUrl} alt={creator.fullName} />
                </ImageContainer>
              </Link>
            ) : (
              <UnknownUser className="h-9 w-9" />
            )}
            <DetailText>
              {creator ? creator.fullName : t("noCreator")}
            </DetailText>
          </div>
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
