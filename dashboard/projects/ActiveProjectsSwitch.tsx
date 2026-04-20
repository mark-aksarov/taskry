import { useTranslations } from "next-intl";
import { Switch } from "@/ui/Switch";

interface ActiveProjectsSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function ActiveProjectsSwitch({
  isSelected,
  onChange,
}: ActiveProjectsSwitchProps) {
  const t = useTranslations("dashboard.projects.ActiveProjectsSwitch");

  return (
    <Switch
      data-test="has-active-projects-switch"
      className="justify-between"
      name="hasActiveProjects"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
