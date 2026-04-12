import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateProjectCategoryRel } from "../UpdateProjectCategoryRelContext";

export function UpdateProjectCategoryRelFormSubmitButton() {
  const t = useTranslations("projects.UpdateProjectCategoryRelForm");

  const { isPending } = useUpdateProjectCategoryRel();

  return (
    <FormBaseSubmitButton
      form="update-project-category-rel-form"
      isPending={isPending}
      label={t("submitButtonLabel")}
    />
  );
}
