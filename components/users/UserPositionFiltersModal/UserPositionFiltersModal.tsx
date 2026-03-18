import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUserFiltersDispatch } from "../UserFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface UserPositionFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function UserPositionFiltersModal({
  filtersFormContainer,
}: UserPositionFiltersModalProps) {
  const t = useTranslations("users.UserPositionFiltersModal");
  const dispatch = useUserFiltersDispatch();

  return (
    <FormBaseModal data-test="user-position-filters-modal">
      <FilterModalDialog>
        <FilterModalDialogHeader
          resetFilters={() => dispatch({ type: "setPosition", payload: [] })}
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
