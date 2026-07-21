import { useTranslations } from "next-intl";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { BackButton } from "@/dashboard/common/BackButton";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";
import { DashboardContainer } from "@/dashboard/common/DashboardContainer";
import { PositionGridSkeleton } from "@/dashboard/position/PositionGrid/PositionGridSkeleton";

export default function AppPositionsPageLoading() {
  const t = useTranslations("app.PositionsPage");

  return (
    <DashboardContainer>
      <DashboardGrid>
        <ToolbarLarge
          firstSlot={
            <>
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
            </>
          }
          secondSlot={<ButtonSkeleton className="w-[5rem]" />}
        />

        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/team" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={
            <>
              <ButtonSkeleton className="w-8" />
              <ButtonSkeleton className="w-8" />
            </>
          }
        />

        <PositionGridSkeleton />
      </DashboardGrid>
    </DashboardContainer>
  );
}
