import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { BackButton } from "@/components/common/BackButton";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { PageContainer } from "@/components/common/PageContainer";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { CustomerDetailAltSkeleton } from "@/components/customer/CustomerDetailAlt";
import { CustomerDetailActionsSkeleton } from "@/components/customer/CustomerDetailActions";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";

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
