import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { PageContainer } from "@/components/common/PageContainer";
import { useTranslations } from "next-intl";

export function TasksPageEmpty() {
  const t = useTranslations("app.TasksPageEmpty");

  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton href="#">{t("addButtonLabel")}</EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
