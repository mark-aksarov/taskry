import {
  ToolbarMobileTop,
  ToolbarMobileHeading,
} from "@/components/common/Toolbar";

import {
  AppHeader,
  AppHeaderContainerProps,
} from "@/components/layout/AppHeader";

import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";

interface CustomerDetailPageProps {
  customerDetailContainer: React.ReactNode;
  customerHeaderContainer: React.ReactNode;
  customerDetailActions: React.ReactNode;
  appHeaderProps: AppHeaderContainerProps;
}

export function CustomerDetailPage({
  customerDetailContainer,
  customerHeaderContainer,
  customerDetailActions,
  appHeaderProps,
}: CustomerDetailPageProps) {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <>
      <AppHeader
        {...appHeaderProps}
        backButtonHref="/customers"
        heading={t("heading")}
      />
      <main>
        <PageContainer>
          <CustomerDetailCard
            customerDetail={customerDetailContainer}
            customerHeader={customerHeaderContainer}
            customerDetailActions={customerDetailActions}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton href="/customers" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <div className="flex flex-col px-1.5">
              {customerHeaderContainer}
            </div>
            <Card className="flex flex-col px-1.5">
              {customerDetailActions}
            </Card>
            <Card className="flex flex-col">{customerDetailContainer}</Card>
          </PageGrid>
        </PageContainer>
      </main>
    </>
  );
}
