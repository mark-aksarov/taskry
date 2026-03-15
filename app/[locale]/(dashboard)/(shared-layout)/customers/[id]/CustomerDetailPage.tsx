import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";

interface CustomerDetailPageProps {
  searchContainer: React.ReactNode;
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
  customerDetailActions: React.ReactNode;
}

export function CustomerDetailPage({
  searchContainer,
  customerDetailContainer,
  customerDetailHeaderContainer,
  customerDetailActions,
}: CustomerDetailPageProps) {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <>
      <PageContainer>
        <CustomerDetailCard
          customerDetailContainer={customerDetailContainer}
          customerDetailHeaderContainer={customerDetailHeaderContainer}
          customerDetailActions={customerDetailActions}
        />

        <PageGrid className="md:hidden">
          <ToolbarMobileTop>
            <BackButton href="/customers" />
            <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
          </ToolbarMobileTop>

          <div className="flex flex-col">{customerDetailHeaderContainer}</div>
          <Card className="flex flex-col p-1.5">{customerDetailActions}</Card>
          <Card className="flex flex-col">{customerDetailContainer}</Card>
        </PageGrid>
      </PageContainer>

      <TaskSearchModal searchContainer={searchContainer} />
    </>
  );
}
