"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, RACDialogTrigger } from "@/components/ui";

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
    <RACDialogTrigger>
      <Button
        aria-label="theme"
        variant="ghost"
        iconLeft={<Search size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        className={className}
      />
      {modal}
    </RACDialogTrigger>
  );
}
