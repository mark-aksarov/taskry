import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";

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
        <DialogHeader>{t("heading")}</DialogHeader>
        <FormBaseModalDialogBody>
          {filtersFormContainer}
        </FormBaseModalDialogBody>
      </FilterModalDialog>
    </FormBaseModal>
  );
}
