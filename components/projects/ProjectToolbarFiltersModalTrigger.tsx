import {
  ToolbarFiltersModal,
  ToolbarFiltersModalDialog,
  ToolbarFiltersModalTrigger,
  ToolbarFiltersModalSubmitButton,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "../ui";

export function ProjectToolbarFiltersModalTrigger({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  const t = useTranslations("projects.ProjectToolbarFiltersModalTrigger");

  return (
    <ToolbarFiltersModalTrigger>
      <ToolbarFiltersModal>
        <ToolbarFiltersModalDialog>
          <DialogHeader>{t("title")}</DialogHeader>
          <DialogBody>{filtersFormContainer}</DialogBody>
          <DialogFooter>
            <ToolbarFiltersModalSubmitButton form="project-filter-form" />
          </DialogFooter>
        </ToolbarFiltersModalDialog>
      </ToolbarFiltersModal>
    </ToolbarFiltersModalTrigger>
  );
}
