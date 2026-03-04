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
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { CustomerDetailActionsSkeleton } from "@/components/customer/CustomerDetailActions";

export default function CustomerDetailLoading({
  appHeaderProps,
}: {
  appHeaderProps: AppHeaderContainerProps;
}) {
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
            customerDetail={<CustomerDetailSkeleton />}
            customerHeader={<DetailHeaderSkeleton />}
            customerDetailActions={<CustomerDetailActionsSkeleton />}
          />

          <PageGrid className="md:hidden">
            <ToolbarMobileTop>
              <BackButton href="/customers" />
              <ToolbarMobileHeading>{t("heading")}</ToolbarMobileHeading>
            </ToolbarMobileTop>

            <div className="flex flex-col">
              <DetailHeaderSkeleton />
            </div>
            <Card className="flex flex-col p-1.5">
              <CustomerDetailActionsSkeleton />
            </Card>
            <Card className="flex flex-col">
              <CustomerDetailSkeleton />
            </Card>
          </PageGrid>
        </PageContainer>
      </main>
    </>
  );
}
