import { Trash } from "lucide-react";
import { Button } from "../ui/Button";

export function ProjectDetailDeleteButton() {
  return (
    <Button
      variant="outlined"
      data-test="delete-project-button"
      iconLeft={<Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />}
    />
  );
}
