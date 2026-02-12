import { useTranslations } from "next-intl";
import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { PositionListItemSkeleton } from "@/components/position/PositionListItem";

export default function PositionsPageLoading() {
  const t = useTranslations("app.PositionsPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <PositionListItemSkeleton />}
    />
  );
}
