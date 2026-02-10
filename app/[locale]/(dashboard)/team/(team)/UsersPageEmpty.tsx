import { useTranslations } from "next-intl";
import { EmptyPageContainer } from "@/components/common/EmptyPageContainer";

interface UsersPageEmptyProps {
  userToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function UsersPageEmpty({
  userToolbarCreateNewMenuTrigger,
}: UsersPageEmptyProps) {
  const t = useTranslations("app.UsersPageEmpty");

  return (
    <EmptyPageContainer
      heading={t("heading")}
      description={t("description")}
      toolbarCreateNewMenuTrigger={userToolbarCreateNewMenuTrigger}
    />
  );
}
