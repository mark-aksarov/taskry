import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface PositionsPageEmptyProps {
  positionToolbarCreateNewModalTrigger: React.ReactNode;
}

export function PositionsPageEmpty({
  positionToolbarCreateNewModalTrigger,
}: PositionsPageEmptyProps) {
  const t = useTranslations("app.PositionsPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={positionToolbarCreateNewModalTrigger}
    />
  );
}
