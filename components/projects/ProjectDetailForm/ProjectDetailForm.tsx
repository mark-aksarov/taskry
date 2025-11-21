import { Button } from "@/components/ui";
import { DetailForm } from "@/components/common/DetailForm";
import { ProjectDetailFormDeadlineDatePicker } from "./ProjectDetailFormDeadlineDatePicker";

interface ProjectDetailFormProps {
  statusSelect: React.ReactNode;
  categorySelect: React.ReactNode;
  customerSelect: React.ReactNode;
}

export function ProjectDetailForm({
  statusSelect,
  categorySelect,
  customerSelect,
}: ProjectDetailFormProps) {
  const buttonClasses = "flex-auto justify-center py-2";

  return (
    <DetailForm>
      {statusSelect}
      <ProjectDetailFormDeadlineDatePicker />
      {customerSelect}
      {categorySelect}
      <div className="flex gap-3">
        <Button
          variant="outlined"
          size="medium"
          type="reset"
          label="Reset"
          className={buttonClasses}
        />
        <Button
          size="medium"
          type="submit"
          label="Save"
          className={buttonClasses}
        />
      </div>
    </DetailForm>
  );
}
