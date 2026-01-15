import { useTranslations } from "next-intl";
import { Skeleton, ToggleButton, ToggleButtonGroup } from "@/components/ui";
import { ToggleButtonGroupProps } from "@/components/ui/ToggleButtonGroup/ToggleButtonGroup";

export interface SearchToggleButtonGroupProps
  extends Pick<ToggleButtonGroupProps, "selectedKeys" | "onSelectionChange"> {}

export function SearchToggleButtonGroup({
  selectedKeys,
  onSelectionChange,
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
      <ToggleButton data-test="users-button" id="users">
        {t("users")}
      </ToggleButton>
      <ToggleButton data-test="tasks-button" id="tasks">
        {t("tasks")}
      </ToggleButton>
      <ToggleButton data-test="projects-button" id="projects">
        {t("projects")}
      </ToggleButton>
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
