import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { CustomerDetailCard } from "@/dashboard/customer/CustomerDetailCard";

interface CustomerDetailPageProps {
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
  customerDetailActions: React.ReactNode;
}

export function CustomerDetailPage({
  customerDetailContainer,
  customerDetailHeaderContainer,
  customerDetailActions,
}: CustomerDetailPageProps) {
  const t = useTranslations("app.CustomerDetailPage");

  return (
    <PageContainer>
      <CustomerDetailCard
        customerDetailContainer={customerDetailContainer}
        customerDetailHeaderContainer={customerDetailHeaderContainer}
        customerDetailActions={customerDetailActions}
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

        <div className="flex flex-col">{customerDetailHeaderContainer}</div>
        <Card className="flex flex-col p-1.5">{customerDetailActions}</Card>
        <Card className="flex flex-col">{customerDetailContainer}</Card>
      </PageGrid>
    </PageContainer>
  );
}
