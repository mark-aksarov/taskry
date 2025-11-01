import {
  DetailInfo,
  DetailText,
  DetailTitle,
  DetailRow,
  DetailInfoSkeleton,
} from "@/components/common/Detail";
import Image from "next/image";
import { TaskDetail } from "@/lib/queries/types";
import { FieldSkeleton } from "@/components/common/FieldSkeleton";
import { Checkbox, CheckboxGroup, Skeleton } from "@/components/ui";
import { TaskDetailStatusMenuTrigger } from "./TaskDetailStatusMenuTrigger";
import { Attachment, Attachments } from "@/components/attachments/Attachments";
import { TaskCommentsModalTrigger } from "../TaskCommentsModalTrigger/TaskCommentsModalTrigger";

export function TaskDetailInner({
  task,
  formattedDeadline,
}: {
  task?: TaskDetail;
  formattedDeadline?: string;
}) {
  const rowStyles = "max-lg:flex-col max-lg:gap-4";
  const itemClasses = "capitalize font-normal";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        {!task ? (
          <Skeleton size="base" className="w-[15rem]" />
        ) : (
          <h2 className="text-base font-bold text-black dark:text-white">
            {task.title}
          </h2>
        )}

        <div className="flex gap-4">
          {!task ? (
            <Skeleton className="h-8 w-[5rem]" />
          ) : (
            <TaskDetailStatusMenuTrigger />
          )}
          {!task ? (
            <Skeleton className="h-8 w-[3.75rem]" />
          ) : (
            <TaskCommentsModalTrigger commentCount={27} taskId={task.id} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <DetailRow className={rowStyles}>
          {!task ? (
            <>
              <DetailInfo>
                <Skeleton className="w-[7rem]" size="xs" />
                <div className="flex flex-col">
                  <Skeleton size="sm" />
                  <Skeleton size="sm" />
                  <Skeleton size="sm" className="w-[15rem]" />
                </div>
              </DetailInfo>
            </>
          ) : (
            <>
              <DetailInfo>
                <DetailTitle>Description</DetailTitle>
                <DetailText>{task.description}</DetailText>
              </DetailInfo>
            </>
          )}
        </DetailRow>

        <DetailRow className={rowStyles}>
          {!task ? (
            <>
              <DetailInfoSkeleton />
              <DetailInfoSkeleton />
            </>
          ) : (
            <>
              <DetailInfo>
                <DetailTitle>Assigned To</DetailTitle>
                <DetailText>Unknown assignee</DetailText>
              </DetailInfo>
              <DetailInfo>
                <DetailTitle>Deadline</DetailTitle>
                <DetailText>{formattedDeadline}</DetailText>
              </DetailInfo>
            </>
          )}
        </DetailRow>

        <DetailRow className={rowStyles}>
          {!task ? (
            <>
              <DetailInfoSkeleton />
              <DetailInfoSkeleton />
            </>
          ) : (
            <>
              <DetailInfo>
                <DetailTitle>Creator</DetailTitle>
                <DetailText>
                  {task.creator ? task.creator.fullName : "Unknown creator"}
                </DetailText>
              </DetailInfo>
              <DetailInfo>
                <DetailTitle>Category</DetailTitle>
                <DetailText>{task.category.name}</DetailText>
              </DetailInfo>
            </>
          )}
        </DetailRow>

        <DetailRow>
          {!task ? (
            <DetailInfoSkeleton />
          ) : (
            <DetailInfo>
              <DetailTitle>Project</DetailTitle>
              <DetailText>{task.project.title}</DetailText>
            </DetailInfo>
          )}
        </DetailRow>

        <DetailRow>
          {!task ? (
            <DetailInfo>
              <FieldSkeleton>
                <Skeleton size="sm" className="w-[15rem]" />
                <Skeleton size="sm" className="w-[15rem]" />
                <Skeleton size="sm" className="w-[15rem]" />
                <Skeleton size="sm" className="w-[15rem]" />
                <Skeleton size="sm" className="w-[15rem]" />
              </FieldSkeleton>
            </DetailInfo>
          ) : (
            <DetailInfo>
              <CheckboxGroup label="Subtasks">
                {task.subtasks.map((subtask) => (
                  <Checkbox
                    key={subtask.id}
                    value={subtask.id.toString()}
                    className={itemClasses}
                  >
                    {subtask.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </DetailInfo>
          )}
        </DetailRow>

        <DetailRow>
          {!task ? (
            <DetailInfo className="border-none">
              <FieldSkeleton>
                <Skeleton size="sm" className="w-[15rem]" />
                <Skeleton size="sm" className="w-[15rem]" />
                <Skeleton size="sm" className="w-[15rem]" />
              </FieldSkeleton>
            </DetailInfo>
          ) : (
            <DetailInfo className="border-none pb-0">
              <DetailTitle>Attachments</DetailTitle>
              {task.attachments.length > 0 && (
                <Attachments>
                  {task.attachments.map((attachment) => (
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
          )}
        </DetailRow>
      </div>
    </div>
  );
}
