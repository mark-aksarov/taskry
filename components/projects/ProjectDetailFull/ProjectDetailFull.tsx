import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import { ProjectDetailFullLayout } from "./ProjectDetailFullLayout";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import Image from "next/image";

interface ProjectDetailFullProps {
  description?: string;
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
  comments: React.ReactNode;
}

export function ProjectDetailFull({
  description,
  attachments,
  comments,
}: ProjectDetailFullProps) {
  return (
    <ProjectDetailFullLayout
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>Description</DetailTitle>
          <DetailText>
            {description ? description : "No description"}
          </DetailText>
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo>
          <DetailTitle>Attachments</DetailTitle>
          {attachments.length > 0 && (
            <Attachments>
              {attachments.map((attachment) => (
                <Attachment
                  key={attachment.id}
                  className="aspect-6/5 h-auto w-auto max-w-[12rem] flex-auto"
                >
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
      commentsSlot={
        <DetailInfo className="border-none pb-0">
          <DetailTitle>Comments</DetailTitle>
          {comments}
        </DetailInfo>
      }
    />
  );
}
