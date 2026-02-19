"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { usePathname, useRouter } from "@/i18n/navigation";

export function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (
    pathname === "/" ||
    pathname === "/projects" ||
    pathname === "/tasks" ||
    pathname === "/team" ||
    pathname === "/customers" ||
    pathname === "/profile"
  ) {
    return null;
  }

  return (
    <Button
      onClick={router.back}
      variant="outlined"
      iconLeft={<ChevronLeft size={16} absoluteStrokeWidth strokeWidth={1.5} />}
    />
  );
}
