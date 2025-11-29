import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";

export function CustomersPageEmpty() {
  const t = useTranslations("app.CustomersPageEmpty");

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
