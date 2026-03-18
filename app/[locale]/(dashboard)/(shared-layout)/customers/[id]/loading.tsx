import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { CustomerDetailActionsSkeleton } from "@/components/customer/CustomerDetailActions";

export default function AppCustomerDetailLoading() {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <PageContainer>
      <CustomerDetailCard
        customerDetailContainer={<CustomerDetailSkeleton />}
        customerDetailHeaderContainer={<DetailHeaderSkeleton />}
        customerDetailActions={<CustomerDetailActionsSkeleton />}
      />

      <PageGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton href="/customers" />
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
          <CustomerDetailSkeleton />
        </Card>
      </PageGrid>
    </PageContainer>
  );
}
