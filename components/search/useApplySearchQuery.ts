import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "@/components/common/PageTransitionContext";

/**
 * Applies a new search query by updating the URL search params.
 * Resets pagination and replaces the current route with the new `query` param.
 */

export function useApplySearchQuery() {
  const { startFilteringTransition } = usePageTransition();

  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const applySearchQuery = (newQuery: string) => {
    // clone the current searchParams
    const newSearchParams = new URLSearchParams(searchParams);

    // reset pagination when applying new filters
    newSearchParams.delete("page");

    // update the search query
    if (!newQuery) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", newQuery);
    }

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return applySearchQuery;
}
