import { useMemo } from "react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useSyncSelectionItem } from "./useSyncSelectionItem";
import { useSelection } from "@/components/common/SelectionContext";

type ProjectItem = {
  id: number;
  title: string;
  status: ProjectStatus;
};

export const useProjectSelection = () => useSelection<number, ProjectItem>();

export const useSyncSelectionProjectItem = (
  id: number,
  title: string,
  status: ProjectStatus,
) => {
  const item = useMemo(() => ({ id, title, status }), [id, title, status]);
  useSyncSelectionItem<number, ProjectItem>(id, item);
};
