"use client";

import { useState } from "react";
import { DateValue } from "react-aria";
import { Switch } from "@/components/ui/Switch";
import { useSearchParams } from "next/navigation";
import { Divider, RACForm } from "@/components/ui";
import { parseDate } from "@internationalized/date";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ProjectFiltersFormDeadlineRange } from "./ProjectFiltersFormDeadlineRange";
import { ProjectFiltersFormDeadlineCheckboxGroup } from "./ProjectFiltersFormDeadlineCheckboxGroup";

interface ProjectFiltersFormProps {
  projectStatusCheckboxGroup: React.ReactNode;
  projectCategoryCheckboxGroup: React.ReactNode;
  customerCheckboxGroup: React.ReactNode;
  userCheckboxGroup: React.ReactNode;
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

export function ProjectFiltersForm({
  projectStatusCheckboxGroup,
  projectCategoryCheckboxGroup,
  customerCheckboxGroup,
  userCheckboxGroup,
}: ProjectFiltersFormProps) {
  const t = useTranslations("projects.ProjectFiltersForm");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // --- STATE ---
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
    const otherKeys = ["status", "category", "customer", "user"];
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
    <RACForm id="project-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Switch className="justify-between">{t("switchText")}</Switch>
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
