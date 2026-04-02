"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface BackButtonProps {
  fallbackHref: string;
}

export function BackButton({ fallbackHref }: BackButtonProps) {
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
      onClick={handleClick}
      variant="outlined"
      iconLeft={<ChevronLeft size={16} absoluteStrokeWidth strokeWidth={1.5} />}
    />
  );
}
