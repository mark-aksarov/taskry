import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CustomerCompanyFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function CustomerCompanyFiltersModal({
  filtersFormContainer,
}: CustomerCompanyFiltersModalProps) {
  const t = useTranslations("customers.CustomerCompanyFiltersModal");

  return (
    <FormBaseModal data-test="customer-company-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
