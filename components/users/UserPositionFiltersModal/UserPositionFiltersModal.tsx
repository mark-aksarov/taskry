"use client";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  UserFiltersFormProvider,
  useUserFiltersFormDispatch,
} from "../UserFiltersForm/UserFiltersFormContext";

import { useTranslations } from "next-intl";
import { useUserFilters } from "../UserFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { useUserPositionFiltersModal } from "./UserPositionFiltersModalContext";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

interface UserPositionFiltersModalProps {
  filtersFormContainer: React.ReactNode;
}

export function UserPositionFiltersModal({
  filtersFormContainer,
}: UserPositionFiltersModalProps) {
  const initialFilters = useUserFilters();
  const { isOpen, onOpenChange } = useUserPositionFiltersModal();

  return (
    <FormBaseModal
      data-test="user-position-filters-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <UserFiltersFormProvider initialFilters={initialFilters}>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </UserFiltersFormProvider>
    </FormBaseModal>
  );
}

export function DialogHeader() {
  const t = useTranslations("users.UserPositionFiltersModal");

  const dispatch = useUserFiltersFormDispatch();

  return (
    <FilterModalDialogHeader
      resetFilters={() => dispatch({ type: "setPositionIds", payload: [] })}
    >
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
