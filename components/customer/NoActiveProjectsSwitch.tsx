import { useTranslations } from "next-intl";
import { Switch } from "@/components/ui/Switch";

interface NoActiveProjectsSwitchProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
}

export function NoActiveProjectsSwitch({
  isSelected,
  onChange,
}: NoActiveProjectsSwitchProps) {
  const t = useTranslations("customers.NoActiveProjectsSwitch");

  return (
    <Switch
      data-test="has-no-active-projects-switch"
      className="justify-between"
      name="hasNoActiveProjects"
      isSelected={isSelected}
      onChange={onChange}
    >
      {t("text")}
    </Switch>
  );
}
