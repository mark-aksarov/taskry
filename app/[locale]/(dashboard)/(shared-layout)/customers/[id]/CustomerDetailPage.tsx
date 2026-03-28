import { useTranslations } from "next-intl";
import { Card } from "@/components/common/Card";
import { PageGrid } from "@/components/common/PageGrid";
import { ToolbarMobile } from "@/components/common/Toolbar";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { CustomerDetailCard } from "@/components/customer/CustomerDetailCard";

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
              <BackButton href="/customers" />
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
