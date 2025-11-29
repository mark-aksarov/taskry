import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("projects.ProjectDetailForm");

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
          label={t("resetButtonLabel")}
          className={buttonClasses}
        />
        <Button
          size="medium"
          type="submit"
          label={t("submitButtonLabel")}
          className={buttonClasses}
        />
      </div>
    </DetailForm>
  );
}
