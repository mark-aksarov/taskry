"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { DateValue } from "react-aria";
import { useSearchParams } from "next/navigation";
import { Divider, RACForm } from "@/components/ui";
import { parseDate } from "@internationalized/date";
import { usePathname, useRouter } from "@/i18n/navigation";
import { TaskFiltersFormDeadlineRange } from "./TaskFiltersFormDeadlineRange";
import { TaskFiltersFormDeadlineCheckboxGroup } from "./TaskFiltersFormDeadlineCheckboxGroup";

interface TaskFiltersFormProps {
  statusCheckboxGroup: React.ReactNode;
  categoryCheckboxGroup: React.ReactNode;
  projectCheckboxGroup: React.ReactNode;
  assigneeCheckboxGroup: React.ReactNode;
}

// Helper to safely parse URL string to CalendarDate
const parseUrlDate = (dateStr: string | null): DateValue | null => {
  if (!dateStr) return null;
  try {
    return parseDate(dateStr);
  } catch (e) {
    return null;
  }
};

export function TaskFiltersForm({
  statusCheckboxGroup,
  categoryCheckboxGroup,
  projectCheckboxGroup,
  assigneeCheckboxGroup,
}: TaskFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Deadline state
  const [deadlineCheckboxes, setDeadlineCheckboxes] = useState<string[]>(
    searchParams.get("deadline")?.split(",") || [],
  );

  // State now uses DateValue type required by React Aria
  const [dateStart, setDateStart] = useState<DateValue | null>(
    parseUrlDate(searchParams.get("dateStart")),
  );

  const [dateEnd, setDateEnd] = useState<DateValue | null>(
    parseUrlDate(searchParams.get("dateEnd")),
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

    if (value) {
      setDeadlineCheckboxes([]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    // Handle Checkboxes
    if (deadlineCheckboxes.length > 0) {
      params.set("deadline", deadlineCheckboxes.join(","));
    } else {
      params.delete("deadline");
    }

    // Handle Date Range (Convert DateValue back to string for URL)
    if (dateStart) params.set("dateStart", dateStart.toString());
    else params.delete("dateStart");

    if (dateEnd) params.set("dateEnd", dateEnd.toString());
    else params.delete("dateEnd");

    // Handle other filters
    const otherKeys = ["status", "category", "project", "assignee"];
    const formData = new FormData(e.currentTarget);
    otherKeys.forEach((key) => {
      const values = formData.getAll(key);
      if (values.length > 0) params.set(key, values.join(","));
      else params.delete(key);
    });

    params.delete("page");
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
