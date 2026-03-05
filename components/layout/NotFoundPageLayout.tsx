import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";

export default function NotFoundPageLayout() {
  const t = useTranslations("app.DashboardNotFoundPage");

  return (
    <PageContainer fullscreen centered>
      <EmptySection className="max-w-[500px]">
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <Button
          as="a"
          href="/"
          size="medium"
          variant="outlined"
          label={t("toHome")}
        />
      </EmptySection>
    </PageContainer>
  );
}
