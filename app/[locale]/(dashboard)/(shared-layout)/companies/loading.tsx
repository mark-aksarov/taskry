import { useTranslations } from "next-intl";
import { PageGrid } from "@/dashboard/common/PageGrid";
import { ButtonSkeleton } from "@/ui/Skeleton";
import { BackButton } from "@/dashboard/common/BackButton";
import { PageContainer } from "@/dashboard/common/PageContainer";
import { CompanyGridSkeleton } from "@/dashboard/company/CompanyGrid";
import { ToolbarLarge, ToolbarMobile } from "@/dashboard/common/Toolbar";
import { PageHeadingMobile } from "@/dashboard/common/PageHeadingMobile";

export default function CompaniesPageLoading() {
  const t = useTranslations("app.CompaniesPage");

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
              <BackButton fallbackHref="/customers" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<ButtonSkeleton className="w-8" />}
        />

        <CompanyGridSkeleton />
      </PageGrid>
    </PageContainer>
  );
}
