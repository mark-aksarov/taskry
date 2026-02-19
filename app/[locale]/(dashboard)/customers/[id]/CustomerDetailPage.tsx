import {
  ToolbarMobileTop,
  ToolbarMobileBottom,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { PageContainer } from "@/components/common/PageContainer";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";
import { BackButton } from "@/components/common/BackButton";

interface CustomerDetailPageProps {
  customerDetailContainer: React.ReactNode;
  customerHeaderContainer: React.ReactNode;
  customerDetailActions: React.ReactNode;
}

export function CustomerDetailPage({
  customerDetailContainer,
  customerHeaderContainer,
  customerDetailActions,
}: CustomerDetailPageProps) {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <PageContainer>
      <CustomerDetailCard
        customerDetail={customerDetailContainer}
        customerHeader={customerHeaderContainer}
        customerDetailActions={customerDetailActions}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobileTop>
          <BackButton />
          <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
        </ToolbarMobileTop>

        <div className="flex flex-col px-1.5">{customerHeaderContainer}</div>
        <Card className="flex flex-col px-1.5">{customerDetailActions}</Card>
        <Card className="flex flex-col">{customerDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
