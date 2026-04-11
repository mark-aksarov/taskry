import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/components/common/Detail";

import { TaskStatus } from "@/generated/prisma/enums";
import { useFormatter, useTranslations } from "next-intl";
import { TaskDetailAltLayout } from "./TaskDetailAltLayout";
import { TaskTitleDetailInfoAlt } from "./TaskTitleDetailInfoAlt";

interface TaskDetailAltProps {
  title: string;
  assignee?: {
    id: string;
    fullName: string;
    imageUrl?: string;
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
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskDetail");

  const format = useFormatter();

  const formattedDeadline = format.dateTime(new Date(deadline), {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <TaskDetailAltLayout
      titleSlot={<TaskTitleDetailInfoAlt title={title} />}
      descriptionSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("description")}</DetailTitle>}
          text={
            <DetailText>
              {description ? description : t("noDescription")}
            </DetailText>
          }
          editButton={<DetailEditButton />}
        />
      }
      assigneesSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("assignee")}</DetailTitle>}
          text={
            assignee ? (
              <DetailText>{assignee.fullName}</DetailText>
            ) : (
              <DetailText>{t("noAssignee")}</DetailText>
            )
          }
          editButton={<DetailEditButton />}
        />
      }
      deadlineSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("deadline")}</DetailTitle>}
          text={<DetailText>{formattedDeadline}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      statusSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("status")}</DetailTitle>}
          text={<DetailText>{tStatus(status)}</DetailText>}
          editButton={<DetailEditButton />}
        />
      }
      categoryNameSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("category")}</DetailTitle>}
          text={
            <DetailText>
              {category ? category.name : t("noCategory")}
            </DetailText>
          }
          editButton={<DetailEditButton />}
        />
      }
      projectTitleSlot={
        <DetailInfoAlt
          title={<DetailTitle>{t("project")}</DetailTitle>}
          text={
            project ? (
              <DetailText>{project.title}</DetailText>
            ) : (
              <DetailText>{t("noProject")}</DetailText>
            )
          }
          editButton={<DetailEditButton />}
        />
      }
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
