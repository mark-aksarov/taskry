import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useOverdueProjectsSwitch } from "./OverdueProjectsSwitchContext";

export function OverdueProjectsSwitch() {
  const t = useTranslations("customers.OverdueProjectsSwitch");

  const { isSelected, updateValue } = useOverdueProjectsSwitch();

  return (
    <Switch
      data-test="has-overdue-projects-switch"
      className="justify-between"
      name="hasOverdueProjects"
      isSelected={isSelected}
      onChange={updateValue}
    >
      {t("text")}
    </Switch>
  );
}
