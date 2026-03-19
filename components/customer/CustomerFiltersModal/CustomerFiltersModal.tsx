"use client";

import {
  useActiveProjectsSwitch,
  ActiveProjectsSwitchProvider,
} from "../ActiveProjectsSwitch";

import {
  useOverdueProjectsSwitch,
  OverdueProjectsSwitchProvider,
} from "../OverdueProjectsSwitch";

import {
  useNoActiveProjectsSwitch,
  NoActiveProjectsSwitchProvider,
} from "../NoActiveProjectsSwitch";

import {
  FormBaseModal,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import {
  useCompanyCheckboxGroup,
  CompanyCheckboxGroupProvider,
} from "@/components/company/CompanyCheckboxGroup";

import { useTranslations } from "next-intl";
import { useCustomerFilters } from "../CustomerFiltersContext";
import { FilterModalDialog } from "@/components/common/FilterModalDialog";
import { FilterModalDialogHeader } from "@/components/common/FilterModalDialogHeader";

export function CustomerFiltersModal({
  filtersFormContainer,
}: {
  filtersFormContainer: React.ReactNode;
}) {
  return (
    <FormBaseModal data-test="customer-filters-modal">
      <Providers>
        <FilterModalDialog>
          <DialogHeader />
          <FormBaseModalDialogBody>
            {filtersFormContainer}
          </FormBaseModalDialogBody>
        </FilterModalDialog>
      </Providers>
    </FormBaseModal>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const {
    hasNoActiveProjects,
    hasActiveProjects,
    hasOverdueProjects,
    companyIds,
  } = useCustomerFilters();

  return (
    <ActiveProjectsSwitchProvider initialValue={!!hasActiveProjects}>
      <NoActiveProjectsSwitchProvider initialValue={!!hasNoActiveProjects}>
        <OverdueProjectsSwitchProvider initialValue={!!hasOverdueProjects}>
          <CompanyCheckboxGroupProvider
            initialValue={
              companyIds ? companyIds.map((id) => id.toString()) : []
            }
          >
            {children}
          </CompanyCheckboxGroupProvider>
        </OverdueProjectsSwitchProvider>
      </NoActiveProjectsSwitchProvider>
    </ActiveProjectsSwitchProvider>
  );
}

function DialogHeader() {
  const t = useTranslations("customers.CustomerFiltersModal");

  const { updateValue: updateCompanyCheckboxGroupValue } =
    useCompanyCheckboxGroup();
  const { updateValue: updateOverdueProjectsSwitchValue } =
    useOverdueProjectsSwitch();
  const { updateValue: updateActiveProjectsSwitchValue } =
    useActiveProjectsSwitch();
  const { updateValue: updateNoActiveProjectsSwitchValue } =
    useNoActiveProjectsSwitch();

  function resetFilters() {
    updateCompanyCheckboxGroupValue([]);
    updateOverdueProjectsSwitchValue(false);
    updateActiveProjectsSwitchValue(false);
    updateNoActiveProjectsSwitchValue(false);
  }

  return (
    <FilterModalDialogHeader resetFilters={resetFilters}>
      {t("heading")}
    </FilterModalDialogHeader>
  );
}
