"use client";

import { useState } from "react";
import { DateValue } from "react-aria";
import { Switch } from "@/components/ui/Switch";
import { Divider, RACForm } from "@/components/ui";
import { parseDate } from "@internationalized/date";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ProjectFilters } from "@/lib/dto/filters/projectFilters";
import { ProjectFiltersFormDeadlineRange } from "./ProjectFiltersFormDeadlineRange";
import { ProjectFiltersFormDeadlineCheckboxGroup } from "./ProjectFiltersFormDeadlineCheckboxGroup";

interface ProjectFiltersFormProps {
  filters: ProjectFilters;
  projectStatusCheckboxGroup: React.ReactNode;
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
}

const parseUrlDate = (dateStr: string | undefined): DateValue | null => {
  if (!dateStr) return null;
  try {
    return parseDate(dateStr);
  } catch {
    return null;
  }
};

export function ProjectFiltersForm({
  filters,
  projectStatusCheckboxGroup,
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
}: ProjectFiltersFormProps) {
  const t = useTranslations("projects.ProjectFiltersForm");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // --- INITIAL STATE FROM FILTERS ---
  const [noActiveTasks, setNoActiveTasks] = useState<boolean>(
    !!filters.noActiveTasks,
  );
  const [deadlineCheckboxes, setDeadlineCheckboxes] = useState<string[]>(
    filters.deadline ? [filters.deadline] : [],
  );
  const [dateStart, setDateStart] = useState<DateValue | null>(
    parseUrlDate(filters.dateStart),
  );
  const [dateEnd, setDateEnd] = useState<DateValue | null>(
    parseUrlDate(filters.dateEnd),
  );

  // --- HANDLERS ---
  const handleCheckboxChange = (values: string[]) => {
    setDeadlineCheckboxes(values);
    if (values.length > 0) {
      setDateStart(null);
      setDateEnd(null);
    }
  };

  const handleRangeChange = (
    value: DateValue | null,
    type: "start" | "end",
  ) => {
    if (type === "start") setDateStart(value);
    else setDateEnd(value);

    if (value) setDeadlineCheckboxes([]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // No active tasks
    if (noActiveTasks) params.set("noActiveTasks", "true");

    // Deadline checkboxes
    if (deadlineCheckboxes.length > 0)
      params.set("deadline", deadlineCheckboxes.join(","));

    // Date range
    if (dateStart) params.set("dateStart", dateStart.toString());
    if (dateEnd) params.set("dateEnd", dateEnd.toString());

    // Other filters
    const otherKeys: (keyof ProjectFilters)[] = [
      "status",
      "category",
      "customer",
      "user",
    ];
    otherKeys.forEach((key) => {
      const formData = new FormData(e.currentTarget);
      const values = formData.getAll(key as string);
      if (values.length > 0) params.set(key, values.join(","));
    });

    params.delete("page"); // reset page on filter change
    router.push(`${pathname}?${params.toString()}`, { locale });
  };

  return (
    <RACForm id="project-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Switch
          className="justify-between"
          isSelected={noActiveTasks}
          onChange={setNoActiveTasks}
          name="noActiveTasks"
        >
          {t("switchText")}
        </Switch>

        <Divider />

        <ProjectFiltersFormDeadlineCheckboxGroup
          value={deadlineCheckboxes}
          onChange={handleCheckboxChange}
        />

        <Divider />

        <ProjectFiltersFormDeadlineRange
          startDate={dateStart}
          endDate={dateEnd}
          onDateChange={handleRangeChange}
          isDisabled={deadlineCheckboxes.length > 0}
        />

        <Divider />
        {projectStatusCheckboxGroup}
        <Divider />
        {projectCategoryCheckboxGroup}
        <Divider />
        {customerCheckboxGroup}
        <Divider />
        {userCheckboxGroup}
      </div>
    </RACForm>
  );
}
