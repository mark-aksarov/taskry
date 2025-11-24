import {
  DetailInfo,
  DetailText,
  DetailTitle,
} from "@/components/common/Detail";
import { TaskDetailFullLayout } from "./TaskDetailFullLayout";
import { SubtasksCheckboxGroup } from "@/components/subtasks/SubtasksCheckboxGroup";
import { NewSubtaskBottomSheetTrigger } from "@/components/subtasks/NewSubtaskBottomSheetTrigger";
import { NewSubtaskModalTrigger } from "@/components/subtasks/NewSubtaskModalTrigger";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import Image from "next/image";

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
  return (
    <TaskDetailFullLayout
      descriptionSlot={
        <DetailInfo>
          <DetailTitle>Description</DetailTitle>
          <DetailText>
            {description ? description : "No description"}
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
          <DetailTitle>Attachments</DetailTitle>
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
          <DetailTitle>Comments</DetailTitle>
          {comments}
        </DetailInfo>
      }
    />
  );
}
