import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import {
  CompanyCheckboxGroupProvider,
  useCompanyCheckboxGroup,
} from "../CompanyCheckboxGroup";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface CompanyFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function CompanyFiltersModal({
  filtersFormContainer,
}: CompanyFiltersModalProps) {
  return (
    <FormBaseModal data-test="company-filters-modal">
      <CompanyCheckboxGroupProvider>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </CompanyCheckboxGroupProvider>
    </FormBaseModal>
  );
}

export function DialogHeader() {
  const t = useTranslations("company.CompanyFiltersModal");

  const { updateValue } = useCompanyCheckboxGroup();

  return (
    <FilterModalDialogHeader resetFilters={() => updateValue([])}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
