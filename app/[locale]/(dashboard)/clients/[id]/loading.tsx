import { useTranslations } from "next-intl";
import { Card } from "@/dashboard/common/Card";
import { BackButton } from "@/dashboard/common/BackButton";
import { ToolbarMobile } from "@/dashboard/common/Toolbar";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { DetailHeaderSkeleton } from "@/dashboard/common/DetailHeader";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { ClientDetailCard } from "@/dashboard/client/ClientDetailCard";
import { ClientDetailAltSkeleton } from "@/dashboard/client/ClientDetailAlt";
import { ClientDetailActionsSkeleton } from "@/dashboard/client/ClientDetailActions";

export default function AppClientDetailLoading() {
  const t = useTranslations("app.ClientDetailPage");

  return (
    <DashboardContainer>
      <ClientDetailCard
        clientDetailContainer={<ClientDetailAltSkeleton />}
        clientDetailHeaderContainer={<DetailHeaderSkeleton />}
        clientDetailActions={<ClientDetailActionsSkeleton />}
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

        <div className="flex flex-col">
          <DetailHeaderSkeleton />
        </div>
        <Card className="flex flex-col p-1.5">
          <ClientDetailActionsSkeleton />
        </Card>
        <Card className="flex flex-col">
          <ClientDetailAltSkeleton />
        </Card>
      </DashboardGrid>
    </DashboardContainer>
  );
}
