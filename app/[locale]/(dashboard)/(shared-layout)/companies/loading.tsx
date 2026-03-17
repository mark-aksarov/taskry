import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { PageGrid } from "@/components/common/PageGrid";
import { ButtonSkeleton } from "@/components/ui/Skeleton";
import { BackButton } from "@/components/common/BackButton";
import { PageContainer } from "@/components/common/PageContainer";
import { ToolbarLarge, ToolbarMobile } from "@/components/common/Toolbar";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { CompanyListItemSkeleton } from "@/components/company/CompanyListItem";

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
              <BackButton href="/customers" />
              <PageHeadingMobile>{t("heading")}</PageHeadingMobile>
            </>
          }
          secondSlot={<ButtonSkeleton className="w-8" />}
        />

        <List>
          <Repeat items={10} renderItem={CompanyListItemSkeleton} />
        </List>
      </PageGrid>
    </PageContainer>
  );
}
