import { useMemo } from "react";
import { TaskStatus } from "@/generated/prisma/enums";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type TaskItem = {
  id: number;
  title: string;
  status: TaskStatus;
};

export const useTaskSelection = () => useSelection<number, TaskItem>();

export const useSyncSelectionTaskItem = (
  id: number,
  title: string,
  status: TaskStatus,
) => {
  const item = useMemo(() => ({ id, title, status }), [id, title, status]);
  useSyncSelectionItem<number, TaskItem>(id, item);
};
