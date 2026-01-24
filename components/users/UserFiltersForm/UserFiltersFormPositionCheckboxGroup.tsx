import { UserFilters } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "@/components/ui";

interface UserFiltersFormPositionCheckboxGroupProps {
  filters: UserFilters;
  positions: { id: number; name: string }[];
}

export function UserFiltersFormPositionCheckboxGroup({
  filters,
  positions,
}: UserFiltersFormPositionCheckboxGroupProps) {
  const t = useTranslations("users.UserFiltersFormPositionCheckboxGroup");

  return (
    <CheckboxGroup
      name="position"
      label={t("label")}
      defaultValue={
        filters.position && filters.position.map((p) => p.toString())
      }
    >
      {positions.map((item) => (
        <Checkbox
          key={item.id}
          value={item.id.toString()}
          className="font-normal capitalize"
        >
          {item.name}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
