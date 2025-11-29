import { Position } from "@/generated/prisma";
import { CheckboxGroup, Checkbox } from "@/components/ui";
import { useTranslations } from "next-intl";

export function UserFiltersFormPositionCheckboxGroup({
  positions,
}: {
  positions: Pick<Position, "id" | "name">[];
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
