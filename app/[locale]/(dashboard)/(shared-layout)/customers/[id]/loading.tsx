import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { CustomerDetailAltSkeleton } from "@/dashboard/customer/CustomerDetailAlt";
import { CustomerDetailActionsSkeleton } from "@/dashboard/customer/CustomerDetailActions";
import { CustomerDetailCard } from "@/dashboard/customer/CustomerDetailCard";

export default function AppCustomerDetailLoading() {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <PageContainer>
      <CustomerDetailCard
        customerDetailContainer={<CustomerDetailAltSkeleton />}
        customerDetailHeaderContainer={<DetailHeaderSkeleton />}
        customerDetailActions={<CustomerDetailActionsSkeleton />}
      />

      <PageGrid className="md:hidden">
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
      </PageGrid>
    </PageContainer>
  );
}
