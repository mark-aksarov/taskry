import {
  ToolbarFiltersModal,
  ToolbarFiltersModalDialog,
  ToolbarFiltersModalTrigger,
  ToolbarFiltersModalDialogHeader,
  ToolbarFiltersModalSubmitButton,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "../ui";

export function ProjectToolbarFiltersModalTrigger({
  filtersForm,
}: {
  filtersForm: React.ReactNode;
}) {
  const t = useTranslations("projects.ProjectToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger>
      <ToolbarFiltersModal>
        <ToolbarFiltersModalDialog>
          <ToolbarFiltersModalDialogHeader>
            {t("title")}
          </ToolbarFiltersModalDialogHeader>
          <DialogBody>{filtersForm}</DialogBody>
          <DialogFooter>
            <ToolbarFiltersModalSubmitButton />
          </DialogFooter>
        </ToolbarFiltersModalDialog>
      </ToolbarFiltersModal>
    </ToolbarFiltersModalTrigger>
  );
}
