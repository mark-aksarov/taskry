import { useTranslations } from "next-intl";
import { Switch } from "@/ui/Switch";

interface OverdueProjectsSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function OverdueProjectsSwitch({
  isSelected,
  onChange,
}: OverdueProjectsSwitchProps) {
  const t = useTranslations("dashboard.projects.OverdueProjectsSwitch");

  return (
    <Switch
      data-test="has-overdue-projects-switch"
      className="justify-between"
      name="hasOverdueProjects"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
