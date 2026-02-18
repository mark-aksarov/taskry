import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";
import { Link } from "../ui/Link";

export default function NotFoundPageLayout() {
  const t = useTranslations("app.DashboardNotFoundPage");

  return (
    <PageContainer fullscreen centered>
      <EmptySection className="max-w-[500px]">
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        <Link href="/" variant="primary" className="text-sm">
          {t("toHome")}
        </Link>
      </EmptySection>
    </PageContainer>
  );
}
