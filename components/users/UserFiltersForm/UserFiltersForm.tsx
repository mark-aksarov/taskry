"use client";

import { useState } from "react";
import { UserFilters } from "@/lib/types";
import { Switch } from "@/components/ui/Switch";
import { Divider, RACForm } from "@/components/ui";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { UserFiltersFormRoleCheckboxGroup } from "./UserFiltersFormRoleCheckboxGroup";

interface UserFiltersFormProps {
  filters: UserFilters;
  positionCheckboxGroup: React.ReactNode;
}

export function UserFiltersForm({
  filters,
  positionCheckboxGroup,
}: UserFiltersFormProps) {
  const t = useTranslations("users.UserFiltersForm");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [hasNoActiveTasks, setHasNoActiveTasks] = useState<boolean>(
    !!filters.hasNoActiveTasks,
  );

  const [hasActiveTasks, setHasActiveTasks] = useState<boolean>(
    !!filters.hasActiveTasks,
  );

  const [hasOverdueTasks, setHasOverdueTasks] = useState<boolean>(
    !!filters.hasOverdueTasks,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (hasNoActiveTasks) params.set("hasNoActiveTasks", "true");
    if (hasActiveTasks) params.set("hasActiveTasks", "true");
    if (hasOverdueTasks) params.set("hasOverdueTasks", "true");

    const formData = new FormData(e.currentTarget);
    const values = formData.getAll("position");
    if (values.length > 0) params.set("position", values.join(","));

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { locale });
  };

  return (
    <RACForm id="user-filter-form" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Switch
          className="justify-between"
          isSelected={hasNoActiveTasks}
          onChange={setHasNoActiveTasks}
          name="hasNoActiveTasks"
        >
          {t("hasNoActiveTasks")}
        </Switch>
        <Divider />

        <Switch
          className="justify-between"
          isSelected={hasActiveTasks}
          onChange={setHasActiveTasks}
          name="hasActiveTasks"
        >
          {t("hasActiveTasks")}
        </Switch>
        <Divider />

        <Switch
          className="justify-between"
          isSelected={hasOverdueTasks}
          onChange={setHasOverdueTasks}
          name="hasOverdueTasks"
        >
          {t("hasOverdueTasks")}
        </Switch>
        <Divider />

        <UserFiltersFormRoleCheckboxGroup />
        <Divider />

        {positionCheckboxGroup}
      </div>
    </RACForm>
  );
}
