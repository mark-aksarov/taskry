import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ClientDetailCard } from "@/dashboard/client/ClientDetailCard";

interface ClientDetailPageProps {
  clientDetailContainer: React.ReactNode;
  clientDetailHeaderContainer: React.ReactNode;
  clientDetailActions: React.ReactNode;
}

export function ClientDetailPage({
  clientDetailContainer,
  clientDetailHeaderContainer,
  clientDetailActions,
}: ClientDetailPageProps) {
  const t = useTranslations("app.ClientDetailPage");

  return (
    <DashboardContainer>
      <ClientDetailCard
        clientDetailContainer={clientDetailContainer}
        clientDetailHeaderContainer={clientDetailHeaderContainer}
        clientDetailActions={clientDetailActions}
      />

      <DashboardGrid className="md:hidden">
        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/clients" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
        />

        <div className="flex flex-col">{clientDetailHeaderContainer}</div>
        <Card className="flex flex-col p-1.5">{clientDetailActions}</Card>
        <Card className="flex flex-col">{clientDetailContainer}</Card>
      </DashboardGrid>
    </DashboardContainer>
  );
}
