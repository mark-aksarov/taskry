import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/Checkbox";
import { CheckboxGroup } from "@/components/ui/CheckboxGroup";

export function UserFiltersFormRoleCheckboxGroup() {
  const t = useTranslations("users.UserFiltersFormRoleCheckboxGroup");

  return (
    <CheckboxGroup label={t("label")}>
      <Checkbox key="1" value="1" className="font-normal capitalize">
        {t("items.admin")}
      </Checkbox>
      <Checkbox key="2" value="2" className="font-normal capitalize">
        {t("items.manager")}
      </Checkbox>
      <Checkbox key="3" value="3" className="font-normal capitalize">
        {t("items.user")}
      </Checkbox>
    </CheckboxGroup>
  );
}
