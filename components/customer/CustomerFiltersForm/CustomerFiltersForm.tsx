"use client";

import { Divider, RACForm } from "@/components/ui";
import { Switch } from "@/components/ui/Switch";
import { useTranslations } from "next-intl";

interface CustomerFiltersFormProps {
  companyCheckboxGroup: React.ReactNode;
}

export function CustomerFiltersForm({
  companyCheckboxGroup,
}: CustomerFiltersFormProps) {
  const t = useTranslations("customers.CustomerFiltersForm");

  return (
    <RACForm>
      <div className="flex flex-col gap-4">
        <Switch className="justify-between">{t("hasNoActiveProjects")}</Switch>
        <Divider />

        <Switch className="justify-between">{t("hasActiveProjects")}</Switch>
        <Divider />

        <Switch className="justify-between">{t("hasOverdueProjects")}</Switch>
        <Divider />

        {companyCheckboxGroup}
      </div>
    </RACForm>
  );
}
