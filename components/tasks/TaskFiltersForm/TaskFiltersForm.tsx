"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { DateValue } from "react-aria";
import { TaskFilters } from "@/lib/types";
import { Divider, RACForm } from "@/components/ui";
import { parseDate } from "@internationalized/date";
import { usePathname, useRouter } from "@/i18n/navigation";
import { TaskFiltersFormDeadlineRange } from "./TaskFiltersFormDeadlineRange";
import { TaskFiltersFormDeadlineCheckboxGroup } from "./TaskFiltersFormDeadlineCheckboxGroup";

interface TaskFiltersFormProps {
  filters: TaskFilters;
  statusCheckboxGroup: React.ReactNode;
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  assigneeCheckboxGroup: React.ReactNode;
}

// Helper to safely parse string to DateValue
const parseUrlDate = (dateStr: string | undefined): DateValue | null => {
  if (!dateStr) return null;
  try {
    return parseDate(dateStr);
  } catch {
    return null;
  }
};

export function TaskFiltersForm({
  filters,
  statusCheckboxGroup,
  categoryCheckboxGroup,
  projectCheckboxGroup,
  assigneeCheckboxGroup,
}: TaskFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // --- INITIAL STATE FROM FILTERS ---
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

    // Deadline checkboxes
    if (deadlineCheckboxes.length > 0)
      params.set("deadline", deadlineCheckboxes.join(","));

    // Date range
    if (dateStart) params.set("dateStart", dateStart.toString());
    if (dateEnd) params.set("dateEnd", dateEnd.toString());

    // Other filters
    const otherKeys: (keyof TaskFilters)[] = [
      "status",
      "category",
      "project",
      "assignee",
    ];
    const formData = new FormData(e.currentTarget);
    otherKeys.forEach((key) => {
      const values = formData.getAll(key as string);
      if (values.length > 0) params.set(key, values.join(","));
    });

    params.delete("page"); // reset page on filter change
    router.push(`${pathname}?${params.toString()}`, { locale });
  };

  return (
    <RACForm id="task-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <TaskFiltersFormDeadlineCheckboxGroup
          value={deadlineCheckboxes}
          onChange={handleCheckboxChange}
        />

        <Divider />

        <TaskFiltersFormDeadlineRange
          startDate={dateStart}
          endDate={dateEnd}
          onDateChange={handleRangeChange}
          isDisabled={deadlineCheckboxes.length > 0}
        />

        <Divider />

        {statusCheckboxGroup}
        <Divider />
        {categoryCheckboxGroup}
        <Divider />
        {projectCheckboxGroup}
        <Divider />
        {assigneeCheckboxGroup}
      </div>
    </RACForm>
  );
}
