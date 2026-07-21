"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/ui/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useTranslations } from "next-intl";

interface BackButtonProps {
  fallbackHref: string;
}

export function BackButton({ fallbackHref }: BackButtonProps) {
  const t = useTranslations("dashboard.common.BackButton");
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  }, [router, fallbackHref]);

  return (
    <Button
      aria-label={t("label")}
      onClick={handleClick}
      variant="secondary"
      outlined
      iconLeft={<ChevronLeft    />}
    />
  );
}
