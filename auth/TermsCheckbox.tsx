"use client";

import { AuthLink } from "./AuthLink";
import { Checkbox } from "@/ui/Checkbox";
import { useTranslations } from "next-intl";

interface TermsCheckboxProps {
  isSelected: boolean;
  onChange: (value: boolean) => void;
  isDisabled?: boolean;
}

export function TermsCheckbox({
  isSelected,
  onChange,
  isDisabled,
}: TermsCheckboxProps) {
  const t = useTranslations("auth.TermsCheckbox");

  return (
    <Checkbox
      isSelected={isSelected}
      onChange={onChange}
      className="font-normal"
      isDisabled={isDisabled}
    >
      <div className="w-full">
        {t("prefix")}{" "}
        <AuthLink
          target="_blank"
          href="/terms"
          className="inline"
          isDisabled={isDisabled}
        >
          {t("terms")}
        </AuthLink>{" "}
        {t("and")}{" "}
        <AuthLink
          target="_blank"
          href="/privacy-policy"
          className="inline"
          isDisabled={isDisabled}
        >
          {t("privacy")}
        </AuthLink>
      </div>
    </Checkbox>
  );
}
