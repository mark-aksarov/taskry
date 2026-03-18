import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCustomerFiltersDispatch } from "../CustomerFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface CustomerCompanyFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerCompanyFiltersModal({
  filtersFormContainer,
}: CustomerCompanyFiltersModalProps) {
  const t = useTranslations("customers.CustomerCompanyFiltersModal");
  const dispatch = useCustomerFiltersDispatch();

  return (
    <FormBaseModal data-test="customer-company-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setCompany", payload: [] })}
        >
          {t("heading")}
        </FilterModalDialogHeader>

        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
