import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { ButtonSkeleton } from "@/components/ui/Skeleton";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { PositionGridSkeleton } from "@/components/position/PositionGrid/PositionGridSkeleton";

export default function AppPositionsPageLoading() {
  const t = useTranslations("app.PositionsPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarLarge
          firstSlot={<ButtonSkeleton className="w-[5rem]" />}
          secondSlot={<ButtonSkeleton className="w-[5rem]" />}
        />

        <ToolbarMobile
          firstSlot={
            <>
              <BackButton fallbackHref="/team" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<ButtonSkeleton className="w-8" />}
        />

        <PositionGridSkeleton />
      </PageGrid>
    </PageContainer>
  );
}
