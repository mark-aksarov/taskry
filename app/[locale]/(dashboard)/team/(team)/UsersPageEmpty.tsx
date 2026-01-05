import {
  EmptySection,
  EmptySectionButton,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";

export function UsersPageEmpty() {
  const t = useTranslations("app.UsersPageEmpty");

  return (
    <PageContainer fullscreen centered>
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <EmptySectionButton createNewModal={<div />}>
          {t("addButtonLabel")}
        </EmptySectionButton>
      </EmptySection>
    </PageContainer>
  );
}
