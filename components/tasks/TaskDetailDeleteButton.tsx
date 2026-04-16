import { Trash } from "lucide-react";
import { Button } from "../ui/Button";

export function TaskDetailDeleteButton() {
  return (
    <Button
      variant="outlined"
      data-test="delete-task-button"
      iconLeft={<Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />}
    />
  );
}
