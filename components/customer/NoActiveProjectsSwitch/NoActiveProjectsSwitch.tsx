import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useNoActiveProjectsSwitch } from "./NoActiveProjectsSwitchContext";

export function NoActiveProjectsSwitch() {
  const t = useTranslations("customers.NoActiveProjectsSwitch");

  const { isSelected, updateValue } = useNoActiveProjectsSwitch();

  return (
    <Switch
      data-test="has-no-active-projects-switch"
      className="justify-between"
      name="hasNoActiveProjects"
      isSelected={isSelected}
      onChange={updateValue}
    >
      {t("text")}
    </Switch>
  );
}
