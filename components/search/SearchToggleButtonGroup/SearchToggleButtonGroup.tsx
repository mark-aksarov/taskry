import { useTranslations } from "next-intl";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { ToggleButtonGroupProps } from "@/components/ui/ToggleButtonGroup/ToggleButtonGroup";

interface SearchToggleButtonGroupProps
  extends Pick<ToggleButtonGroupProps, "selectedKeys" | "onSelectionChange"> {
  totalUsersCount?: number;
  totalTasksCount?: number;
  totalProjectsCount?: number;
}

export function SearchToggleButtonGroup({
  selectedKeys,
  onSelectionChange,
  totalUsersCount,
  totalTasksCount,
  totalProjectsCount,
}: SearchToggleButtonGroupProps) {
  const t = useTranslations("search.SearchToggleButtonGroup");

  return (
    <ToggleButtonGroup
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      selectionMode="single"
      disallowEmptySelection
      variant="contrast"
      className="p-4"
    >
      {totalUsersCount && (
        <ToggleButton id="users">
          {t("users")} ({totalUsersCount})
        </ToggleButton>
      )}

      {totalTasksCount && (
        <ToggleButton id="tasks">
          {t("tasks")} ({totalTasksCount})
        </ToggleButton>
      )}

      {totalProjectsCount && (
        <ToggleButton id="projects">
          {t("projects")} ({totalProjectsCount})
        </ToggleButton>
      )}
    </ToggleButtonGroup>
  );
}

export function SearchToggleButtonGroupSkeleton() {
  return (
    <div className="inline-flex gap-4">
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
      <Skeleton className="h-8 w-[5rem] rounded-lg" />
    </div>
  );
}
