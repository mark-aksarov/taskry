import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";
import { useOverdueProjectsSwitch } from "./OverdueProjectsSwitch/OverdueProjectsSwitchContext";

interface OverdueProjectsSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function OverdueProjectsSwitch({
  isSelected,
  onChange,
}: OverdueProjectsSwitchProps) {
  const t = useTranslations("customers.OverdueProjectsSwitch");

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
