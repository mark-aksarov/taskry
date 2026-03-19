import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useActiveProjectsSwitch } from "./ActiveProjectsSwitchContext";

export function ActiveProjectsSwitch() {
  const t = useTranslations("customers.ActiveProjectsSwitch");

  const { isSelected, updateValue } = useActiveProjectsSwitch();

  return (
    <Switch
      data-test="has-active-projects-switch"
      className="justify-between"
      name="hasActiveProjects"
      isSelected={isSelected}
      onChange={updateValue}
    >
      {t("text")}
    </Switch>
  );
}
