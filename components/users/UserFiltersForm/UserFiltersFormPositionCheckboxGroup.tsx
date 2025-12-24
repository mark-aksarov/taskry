import { useTranslations } from "next-intl";
import { UserFilters } from "@/lib/data/user/user.dto";
import { CheckboxGroup, Checkbox } from "@/components/ui";

interface UserFiltersFormServerContainerProps {
  filters: UserFilters;
  positions: { id: number; name: string }[];
}

export function UserFiltersFormPositionCheckboxGroup({
  filters,
  positions,
}: UserFiltersFormServerContainerProps) {
  const t = useTranslations("users.UserFiltersForm.positionCheckboxGroup");

  return (
    <CheckboxGroup
      name="position"
      label={t("label")}
      defaultValue={filters.position.map((p) => p.toString())}
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
