import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

type ErrorLike = {
  status?: number;
} | null;

export function useHandleDetailContainerError(
  error: ErrorLike,
  notFoundPath: string,
) {
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (!error) return;

    if (error.status === 404) {
      router.push(notFoundPath, { locale });
      return;
    }

    throw new Error();
  }, [error, notFoundPath, router, locale]);
}
