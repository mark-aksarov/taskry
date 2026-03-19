import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  useProjectCheckboxGroup,
  ProjectCheckboxGroupProvider,
} from "@/components/projects/ProjectCheckboxGroup";

import { useTranslations } from "next-intl";
import { useTaskFilters } from "../TaskFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface TaskProjectFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskProjectFiltersModal({
  filtersFormContainer,
}: TaskProjectFiltersModalProps) {
  const { projectIds } = useTaskFilters();

  return (
    <FormBaseModal data-test="task-project-filters-modal">
      <ProjectCheckboxGroupProvider initialProjectIds={projectIds}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </ProjectCheckboxGroupProvider>
    </FormBaseModal>
  );
}

function DialogHeader() {
  const t = useTranslations("tasks.TaskProjectFiltersModal");

  const { updateValue } = useProjectCheckboxGroup();

  return (
    <FilterModalDialogHeader resetFilters={() => updateValue([])}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
