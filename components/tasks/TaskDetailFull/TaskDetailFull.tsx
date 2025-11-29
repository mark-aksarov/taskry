import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { TaskDetailFullLayout } from "./TaskDetailFullLayout";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { SubtasksCheckboxGroup } from "@/components/subtasks/SubtasksCheckboxGroup";
import { NewSubtaskModalTrigger } from "@/components/subtasks/NewSubtaskModalTrigger";
import { NewSubtaskBottomSheetTrigger } from "@/components/subtasks/NewSubtaskBottomSheetTrigger";

interface TaskDetailFullProps {
  description?: string;
  subtasks: {
    id: number;
    text: string;
    isDone: boolean;
  }[];
  attachments: {
    id: number;
    fileUrl: string;
    fileName: string;
  }[];
  comments: React.ReactNode;
}

export function TaskDetailFull({
  description,
  subtasks,
  attachments,
  comments,
}: TaskDetailFullProps) {
  const t = useTranslations("tasks.TaskDetailFull");

  return (
    <TaskDetailFullLayout
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>{t("description")}</DetailTitle>
          <DetailText>
            {description ? description : t("noDescription")}
          </DetailText>
        </DetailInfo>
      }
      subtasksSlot={
        <DetailInfo>
          <SubtasksCheckboxGroup subtasks={subtasks} />
          <NewSubtaskBottomSheetTrigger />
          <NewSubtaskModalTrigger />
        </DetailInfo>
      }
      attachmentsSlot={
        <DetailInfo>
          <DetailTitle>{t("attachments")}</DetailTitle>
          {attachments.length > 0 && (
            <Attachments>
              {attachments.map((attachment) => (
                <Attachment
                  key={attachment.id}
                  className="aspect-6/5 h-auto! w-auto max-w-[12rem] flex-auto"
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
          <DetailTitle>{t("comments")}</DetailTitle>
          {comments}
        </DetailInfo>
      }
    />
  );
}
