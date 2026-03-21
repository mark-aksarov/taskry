import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "@/components/common/PageTransitionContext";

/**
 * Applies new filter params by updating the URL search params.
 * Resets pagination and replaces the current route with the new params.
 */
export function useApplyFilterURL() {
  const { startFilteringTransition } = usePageTransition();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const applyFilterURL = (newSearchParams: URLSearchParams) => {
    // reset pagination when applying new filters
    newSearchParams.delete("page");

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, {
        locale,
        scroll: false,
      });
    });
  };

  return applyFilterURL;
}
