import { useProjectItemPending } from "./ProjectItem";
import { ProjectStatus } from "@/generated/prisma/enums";
import { SelectableItem } from "../common/SelectableItem";
import { useSelectedProjects } from "./SelectedProjectsContext";

interface SelectableProjectItemProps {
  projectId: number;
  projectStatus: ProjectStatus;
  children: React.ReactNode;
}

export function SelectableProjectItem({
  projectId,
  projectStatus,
  children,
}: SelectableProjectItemProps) {
  const selected = useSelectedProjects();
  const isPending = useProjectItemPending(projectId);

  return (
    <SelectableItem
      {...selected}
      item={{ id: projectId, status: projectStatus }}
      isPending={isPending}
    >
      {children}
    </SelectableItem>
  );
}
