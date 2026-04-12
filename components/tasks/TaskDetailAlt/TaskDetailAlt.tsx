import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";

import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { TaskTitleDetailInfoAlt } from "./TaskTitleDetailInfoAlt";
import { TaskStatusDetailInfoAlt } from "./TaskStatusDetailInfoAlt";
import { TaskProjectDetailInfoAlt } from "./TaskProjectDetailInfoAlt";
import { TaskDeadlineDetailInfoAlt } from "./TaskDeadlineDetailInfoAlt";
import { TaskAssigneeDetailInfoAlt } from "./TaskAssigneeDetailInfoAlt";
import { TaskCategoryDetailInfoAlt } from "./TaskCategoryDetailInfoAlt";
import { TaskDescriptionDetailInfoAlt } from "./TaskDescriptionDetailInfoAlt";

interface TaskDetailAltProps {
  title: string;
  assignee?: {
    id: string;
    fullName: string;
  };
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  deadline: string;
  description?: string;
  category?: {
    id: number;
    name: string;
  };
  project?: {
    id: number;
    title: string;
  };
  status: TaskStatus;
}

export function TaskDetailAlt({
  title,
  assignee,
  creator,
  deadline,
  description,
  category,
  project,
  status,
}: TaskDetailAltProps) {
  const t = useTranslations("tasks.TaskDetail");

  return (
    <TaskDetailAltLayout
      titleSlot={<TaskTitleDetailInfoAlt title={title} />}
      descriptionSlot={
        <TaskDescriptionDetailInfoAlt description={description} />
      }
      assigneesSlot={<TaskAssigneeDetailInfoAlt assignee={assignee} />}
      deadlineSlot={<TaskDeadlineDetailInfoAlt deadline={deadline} />}
      statusSlot={<TaskStatusDetailInfoAlt status={status} />}
      categoryNameSlot={<TaskCategoryDetailInfoAlt category={category} />}
      projectTitleSlot={<TaskProjectDetailInfoAlt project={project} />}
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
          editButton={<DetailEditButton />}
        />
      }
    />
  );
}
