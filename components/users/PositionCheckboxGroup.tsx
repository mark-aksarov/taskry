import { use } from "react";
import { Position } from "@/generated/prisma";
import { CheckboxGroup, Checkbox } from "@/components/ui";

export function PositionCheckboxGroup({
  positionsPromise,
}: {
  positionsPromise: Promise<Position[]>;
}) {
  const positions = use(positionsPromise);

  if (!positions.length) {
    return null;
  }

  return (
    <CheckboxGroup label="Position">
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
