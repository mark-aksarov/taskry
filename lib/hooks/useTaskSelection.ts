import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { useMemo } from "react";

type TaskItem = {
  id: number;
  title: string;
  status: TaskStatus;
  projectStatus: ProjectStatus;
};

export const useTaskSelection = () => useSelection<number, TaskItem>();

export const useSyncSelectionTaskItem = (
  id: number,
  title: string,
  status: TaskStatus,
  projectStatus: ProjectStatus,
) => {
  const item = useMemo(
    () => ({ id, title, status, projectStatus }),
    [id, title, status, projectStatus],
  );
  useSyncSelectionItem<number, TaskItem>(id, item);
};
