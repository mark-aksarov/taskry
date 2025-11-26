"use client";

import { useRouter } from "@/i18n/navigation";
import { ToggleButton } from "@/components/ui";
import { ToggleButtonProps } from "@/components/ui/ToggleButtonGroup";
import { useEffect } from "react";

export function PageTab({ id, ...props }: ToggleButtonProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(id as string);
  }, []);

  return <ToggleButton id={id} {...props} />;
}
