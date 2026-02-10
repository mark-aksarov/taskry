import {
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { ToolbarDesktop, ToolbarMobileTop } from "@/components/common/Toolbar";

interface TasksPageEmptyProps {
  taskToolbarCreateNewMenuTrigger: React.ReactNode;
}

export function TasksPageEmpty({
  taskToolbarCreateNewMenuTrigger,
}: TasksPageEmptyProps) {
  const t = useTranslations("app.TasksPageEmpty");

  return (
    <PageContainer fullscreen className="relative">
      <PageGrid className="flex-auto">
        <ToolbarDesktop>
          <div className="ml-auto">{taskToolbarCreateNewMenuTrigger}</div>
        </ToolbarDesktop>
        <ToolbarMobileTop>
          <div className="ml-auto">{taskToolbarCreateNewMenuTrigger}</div>
        </ToolbarMobileTop>

        <PageEmptySection>
          <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
          <EmptySectionDescription>{t("description")}</EmptySectionDescription>
        </PageEmptySection>
      </PageGrid>
    </PageContainer>
  );
}
