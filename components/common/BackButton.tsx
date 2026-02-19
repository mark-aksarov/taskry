"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/i18n/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={router.back}
      variant="outlined"
      iconLeft={<ChevronLeft size={16} absoluteStrokeWidth strokeWidth={1.5} />}
    />
  );
}
