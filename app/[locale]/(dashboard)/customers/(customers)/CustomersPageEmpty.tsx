import {
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarDesktop, ToolbarMobileTop } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { PageEmptySection } from "@/components/common/PageEmptySection";

interface CustomersPageEmptyProps {
  customerToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function CustomersPageEmpty({
  customerToolbarCreateNewMenuTrigger,
}: CustomersPageEmptyProps) {
  const t = useTranslations("app.CustomersPageEmpty");

  return (
    <PageContainer fullscreen className="relative">
      <PageGrid className="flex-auto">
        <ToolbarDesktop>
          <div className="ml-auto">{customerToolbarCreateNewMenuTrigger}</div>
        </ToolbarDesktop>
        <ToolbarMobileTop>
          <div className="ml-auto">{customerToolbarCreateNewMenuTrigger}</div>
        </ToolbarMobileTop>

        <PageEmptySection>
          <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
          <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        </PageEmptySection>
      </PageGrid>
    </PageContainer>
  );
}
