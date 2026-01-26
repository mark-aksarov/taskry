import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface ProjectFormBaseStatusSelectProps {
  defaultSelectedKey?: string;
}

export function ProjectFormBaseStatusSelect({
  defaultSelectedKey,
}: ProjectFormBaseStatusSelectProps) {
  const t = useTranslations("projects.ProjectFormBaseStatusSelect");
  const tStatus = useTranslations("projects.ProjectStatus");

  return (
    <ResponsiveSelect
      data-test="status-select"
      name="status"
      label={t("label")}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      isRequired
      defaultSelectedKey={defaultSelectedKey}
      errorMessage={t("validation.required")}
    >
      <Item key="pending">{tStatus("pending")}</Item>
      <Item key="active">{tStatus("active")}</Item>
      <Item key="completed">{tStatus("completed")}</Item>
    </ResponsiveSelect>
  );
}
