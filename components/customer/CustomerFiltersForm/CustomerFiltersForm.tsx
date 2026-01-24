"use client";

import { useState } from "react";
import { Form } from "react-aria-components";
import { CustomerFilters } from "@/lib/types";
import { Switch } from "@/components/ui/Switch";
import { Divider } from "@/components/ui/Divider";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

interface CustomerFiltersFormProps {
  filters: CustomerFilters;
  companyCheckboxGroup: React.ReactNode;
}

export function CustomerFiltersForm({
  filters,
  companyCheckboxGroup,
}: CustomerFiltersFormProps) {
  const t = useTranslations("customers.CustomerFiltersForm");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [hasNoActiveProjects, setHasNoActiveProjects] = useState<boolean>(
    !!filters.hasNoActiveProjects,
  );

  const [hasActiveProjects, setHasActiveProjects] = useState<boolean>(
    !!filters.hasActiveProjects,
  );

  const [hasOverdueProjects, setHasOverdueProjects] = useState<boolean>(
    !!filters.hasOverdueProjects,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (hasNoActiveProjects) params.set("hasNoActiveProjects", "true");
    if (hasActiveProjects) params.set("hasActiveProjects", "true");
    if (hasOverdueProjects) params.set("hasOverdueProjects", "true");

    const formData = new FormData(e.currentTarget);
    const values = formData.getAll("company");
    if (values.length > 0) params.set("company", values.join(","));

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { locale });
  };

  return (
    <Form id="customer-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Switch
          className="justify-between"
          isSelected={hasNoActiveProjects}
          onChange={setHasNoActiveProjects}
          name="hasNoActiveProjects"
        >
          {t("hasNoActiveProjects")}
        </Switch>
        <Divider />

        <Switch
          className="justify-between"
          isSelected={hasActiveProjects}
          onChange={setHasActiveProjects}
          name="hasActiveProjects"
        >
          {t("hasActiveProjects")}
        </Switch>
        <Divider />

        <Switch
          className="justify-between"
          isSelected={hasOverdueProjects}
          onChange={setHasOverdueProjects}
          name="hasOverdueProjects"
        >
          {t("hasOverdueProjects")}
        </Switch>
        <Divider />

        {companyCheckboxGroup}
      </div>
    </Form>
  );
}
