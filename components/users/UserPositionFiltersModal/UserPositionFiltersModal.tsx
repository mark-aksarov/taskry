import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UserPositionFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function UserPositionFiltersModal({
  filtersFormContainer,
}: UserPositionFiltersModalProps) {
  const t = useTranslations("users.UserPositionFiltersModal");

  return (
    <FormBaseModal data-test="user-position-filters-modal">
      <FilterModalDialog>
        <DialogHeaderWithClose>{t("heading")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
