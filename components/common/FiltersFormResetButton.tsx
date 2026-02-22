import { useContext } from "react";
import { PressEvent } from "react-aria";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransitionContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";

interface FiltersResetButtonProps {
  clearSelectedItems: () => void;
}

export function FiltersFormResetButton({
  clearSelectedItems,
}: FiltersResetButtonProps) {
  const overlayContext = useContext(OverlayTriggerStateContext);

  if (!overlayContext) {
    throw new Error(
      "FiltersFormResetButton must be used within a FormBaseModal",
    );
  }

  const t = useTranslations("common.FiltersResetButton");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { startFilteringTransition } = usePageTransition();

  const { close: closeModal } = overlayContext;

  const handlePress = (e: PressEvent) => {
    //close modal immediately
    closeModal();

    const newSearchParams = new URLSearchParams();

    // preserve the "sort" param when resetting filters
    const sort = searchParams.get("sort");
    if (sort) newSearchParams.set("sort", sort);

    // if the new searchParams are the same as the current searchParams, do nothing
    if (
      areSearchParamsEqual({
        a: searchParams,
        b: newSearchParams,
        excludeKeys: ["page", "sort", "pageSize"],
      })
    ) {
      return;
    }

    clearSelectedItems();
    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    });
  };

  return (
    <Button
      variant="outlined"
      label={t("label")}
      size="medium"
      className="w-full justify-center px-0"
      onPress={handlePress}
    />
  );
}
