import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { CustomerDetailCard } from "@/dashboard/customer/CustomerDetailCard";
import { CustomerDetailAltSkeleton } from "@/dashboard/customer/CustomerDetailAlt";
import { CustomerDetailActionsSkeleton } from "@/dashboard/customer/CustomerDetailActions";

export default function AppCustomerDetailLoading() {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <DashboardContainer>
      <CustomerDetailCard
        customerDetailContainer={<CustomerDetailAltSkeleton />}
        customerDetailHeaderContainer={<DetailHeaderSkeleton />}
        customerDetailActions={<CustomerDetailActionsSkeleton />}
      />

      <DashboardGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/customers" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div className="flex flex-col">
          <DetailHeaderSkeleton />
        </div>
        <Card className="flex flex-col p-1.5">
          <CustomerDetailActionsSkeleton />
        </Card>
        <Card className="flex flex-col">
          <CustomerDetailAltSkeleton />
        </Card>
      </DashboardGrid>
    </DashboardContainer>
  );
}
