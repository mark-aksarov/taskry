"use client";

import { tv } from "tailwind-variants";
import { Languages } from "lucide-react";
import { focusRing } from "../ui/styles";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { LangMenuTrigger } from "@/components/common/LangMenuTrigger";

const styles = tv({
  extend: focusRing,
  base: "mb-10 flex cursor-pointer items-center gap-2 self-start text-sm font-bold text-black dark:text-white",
});

export const AuthLangMenuTrigger = () => {
  const t = useTranslations("common.LangMenuTrigger");

  return (
    <LangMenuTrigger
      placement="bottom left"
      renderButton={() => (
        <Button className={styles}>
          <Languages size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("label")}
        </Button>
      )}
    />
  );
};
