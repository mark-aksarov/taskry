"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { ToggleButtonGroup } from "@/components/ui";

export function PageTabs({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ToggleButtonGroup
      disallowEmptySelection
      selectionMode="single"
      variant="contrast"
      selectedKeys={[pathname]}
      onSelectionChange={(keys) => {
        const [key] = Array.from(keys);
        router.push(key as string);
      }}
    >
      {children}
    </ToggleButtonGroup>
  );
}
