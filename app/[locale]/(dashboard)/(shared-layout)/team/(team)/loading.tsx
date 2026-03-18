import {
  ToolbarLarge,
  ToolbarMobile,
  ToolbarSearchMobile,
  ToolbarFiltersMobile,
} from "@/components/common/Toolbar";

import { useTranslations } from "next-intl";
import { PageGrid } from "@/components/common/PageGrid";
import { UserListSkeleton } from "@/components/users/UserList";
import { PageContainer } from "@/components/common/PageContainer";
import { ButtonSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { UserGridMobileSkeleton } from "@/components/users/UserGrid";
import { PageHeadingMobile } from "@/components/common/PageHeadingMobile";
import { SearchModalTriggerSkeleton } from "@/components/search/SearchModalTrigger";

export default function AppUsersPageLoading() {
  const t = useTranslations("app.UsersPage");

  return (
    <PageContainer>
      <PageGrid>
        <ToolbarLarge
          firstSlot={
            <>
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
            </>
          }
          secondSlot={
            <>
              <ButtonSkeleton className="w-[5rem]" />
              <ButtonSkeleton className="w-[5rem]" />
            </>
          }
          twoRowsOnLg
        />

        <ToolbarMobile
          firstSlot={<PageHeadingMobile>{t("heading")}</PageHeadingMobile>}
          secondSlot={
            <>
              <ButtonSkeleton className="w-8" />
              <ButtonSkeleton className="w-8" />
            </>
          }
        />

        <ToolbarSearchMobile>
          <SearchModalTriggerSkeleton />
        </ToolbarSearchMobile>

        <ToolbarFiltersMobile>
          <ButtonSkeleton className="w-[5rem] rounded-full" />
          <ButtonSkeleton className="w-[5rem] rounded-full" />
        </ToolbarFiltersMobile>

        <ToolbarMobile
          firstSlot={<Skeleton size="xs" className="w-[5rem]" />}
          secondSlot={<ButtonSkeleton ghost className="w-[7rem]" />}
        />

        <UserListSkeleton className="max-md:hidden" items={10} />
        <UserGridMobileSkeleton className="md:hidden" items={10} />
      </PageGrid>
    </PageContainer>
  );
}
