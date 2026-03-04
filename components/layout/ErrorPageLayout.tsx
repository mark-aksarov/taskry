import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";
import { Button } from "../ui/Button";

export default function ErrorPageLayout({ reset }: { reset: () => void }) {
  const t = useTranslations("app.DashboardErrorPage");

  return (
    <PageContainer fullscreen centered>
      <EmptySection className="max-w-[500px]">
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <Button
          variant="outlined"
          label={t("resetButtonLabel")}
          size="medium"
          onPress={reset}
        />
      </EmptySection>
    </PageContainer>
  );
}
