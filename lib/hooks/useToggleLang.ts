import { Key } from "react-aria";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";

export function useToggleLang() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleLang = function toggleLang(key: Key) {
    const nextLocale = key as "en" | "ru";

    router.push(`${pathname}?${searchParams.toString()}`, {
      locale: nextLocale,
    });
  };

  return toggleLang;
}
