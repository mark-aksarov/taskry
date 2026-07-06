import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
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
    <DashboardContainer>
      <CustomerDetailCard
        customerDetailContainer={customerDetailContainer}
        customerDetailHeaderContainer={customerDetailHeaderContainer}
        customerDetailActions={customerDetailActions}
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

        <div className="flex flex-col">{customerDetailHeaderContainer}</div>
        <Card className="flex flex-col p-1.5">{customerDetailActions}</Card>
        <Card className="flex flex-col">{customerDetailContainer}</Card>
      </DashboardGrid>
    </DashboardContainer>
  );
}
