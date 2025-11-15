"use client";

import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import Image from "next/image";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { Badge, Button, Link } from "@/components/ui";
import { ProjectDetailLayout } from "./ProjectDetailLayout";
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
  deadline: Date;
  description?: string;
  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  category: {
    id: number;
    name: string;
  };
  status: {
    id: string;
    name: string;
  };
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
    <ProjectDetailLayout
      titleSlot={
        <h2 className="text-base font-bold text-black dark:text-white">
          {title}
        </h2>
      }
      statusMenuTriggerSlot={<ProjectDetailStatusMenuTrigger />}
      openProjectSlot={
        <Button
          variant="outlined"
          className="rounded-lg"
          iconLeft={
            <ExternalLink size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
        />
      }
      creatorSlot={
        <DetailInfo>
          <DetailTitle>Creator</DetailTitle>
          <div className="flex items-center gap-2">
            {creator?.imageUrl ? (
              <Link href={`/users/${id}`}>
                <ImageContainer className="h-9 w-9">
                  <Image fill src={creator.imageUrl} alt={creator.fullName} />
                </ImageContainer>
              </Link>
            ) : (
              <ImageContainer className="h-9 w-9" />
            )}
            <DetailText>
              {creator ? creator.fullName : "Unknown creator"}
            </DetailText>
          </div>
        </DetailInfo>
      }
      deadlineSlot={
        <DetailInfo className="md:gap-3.5">
          <DetailTitle>Deadline</DetailTitle>
          <Badge color="gray" className="self-start">
            {formattedDeadline}
          </Badge>
        </DetailInfo>
      }
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>Description</DetailTitle>
          <DetailText>
            {description ? description : "No description"}
          </DetailText>
        </DetailInfo>
      }
      customerSlot={
        <DetailInfo>
          <DetailTitle>Customer</DetailTitle>
          <DetailText>
            {customer ? customer.fullName : "Unknown customer"}
          </DetailText>
        </DetailInfo>
      }
      categorySlot={
        <DetailInfo>
          <DetailTitle>Category</DetailTitle>
          <DetailText>{category.name}</DetailText>
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>Attachments</DetailTitle>
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
