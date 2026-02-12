import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface PositionsPageEmptyProps {
  positionToolbarCreateNewButton: React.ReactNode;
}

export function PositionsPageEmpty({
  positionToolbarCreateNewButton,
}: PositionsPageEmptyProps) {
  const t = useTranslations("app.PositionsPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={positionToolbarCreateNewButton}
    />
  );
}
