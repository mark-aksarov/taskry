import { useTranslations } from "next-intl";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function UserFiltersFormPositionCheckboxGroup({
  positions,
}: {
  positions: { id: number; name: string }[];
}) {
  const t = useTranslations("users.UserFiltersForm.positionCheckboxGroup");

  return (
    <CheckboxGroup label={t("label")}>
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
