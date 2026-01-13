import {
  Dialog,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useTranslations } from "next-intl";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";
import { useGlobalContainer } from "../layout/GlobalContainerContext";

export function SearchModal() {
  const t = useTranslations("search.SearchModal");

  const { SearchContainer } = useGlobalContainer();

  if (!SearchContainer) {
    throw new Error("SearchContainer is missing in GlobalContainerContext");
  }

  return (
    <ResponsiveModal
      data-test="search-modal"
      isDismissable
      className="w-[600px]"
    >
      <Dialog className="md:h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>

        <SearchContainer />
      </Dialog>
    </ResponsiveModal>
  );
}
