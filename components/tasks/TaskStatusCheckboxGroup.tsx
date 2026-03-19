"use client";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

interface TaskStatusCheckboxGroupProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function TaskStatusCheckboxGroup({
  value,
  onChange,
}: TaskStatusCheckboxGroupProps) {
  const tStatus = useTranslations("tasks.TaskStatus");
  const t = useTranslations("tasks.TaskStatusCheckboxGroup");

  return (
    <CheckboxGroup
      name="statuses"
      label={t("label")}
      value={value}
      onChange={onChange}
    >
      <Checkbox
        data-test="pending-checkbox"
        key="pending"
        value="pending"
        className="font-normal capitalize"
      >
        {tStatus("pending")}
      </Checkbox>

      <Checkbox
        data-test="active-checkbox"
        key="active"
        value="active"
        className="font-normal capitalize"
      >
        {tStatus("active")}
      </Checkbox>

      <Checkbox
        data-test="completed-checkbox"
        key="completed"
        value="completed"
        className="font-normal capitalize"
      >
        {tStatus("completed")}
      </Checkbox>
    </CheckboxGroup>
  );
}
