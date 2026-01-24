"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";

interface SearchModalTriggerMobileProps {
  modal: React.ReactNode;
  className?: string;
}

export function SearchModalTriggerMobile({
  modal,
  className,
}: SearchModalTriggerMobileProps) {
  const t = useTranslations("search.SearchModalTriggerMobile");

  return (
    <DialogTrigger>
      <Button
        aria-label={t("ariaLabel")}
        variant="ghost"
        iconLeft={<Search size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className={className}
      />
      {modal}
    </DialogTrigger>
  );
}
