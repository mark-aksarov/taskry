import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderHeading,
  AppHeaderLangMenuTrigger,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { AppNavigation } from "../AppNavigation";
import { BackButton } from "@/dashboard/common/BackButton";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { AppBottomSheetTrigger } from "@/dashboard/layout/AppBottomSheetTrigger";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";

export interface AppHeaderProps {
  heading: string;
  backButtonHref?: string;
  profileLinkContainer: React.ReactNode;
}

export const AppHeader = ({
  heading,
  backButtonHref,
  profileLinkContainer,
}: AppHeaderProps) => {
  return (
    <AppHeaderBase>
      <div className="px-4 md:hidden">
        <AppHeaderLayout
          left={<>{profileLinkContainer}</>}
          right={<AppBottomSheetTrigger appNavigation={<AppNavigation />} />}
        />
      </div>
      <div className="px-6 max-md:hidden">
        <AppHeaderLayout
          left={
            <>
              {backButtonHref && <BackButton fallbackHref={backButtonHref} />}
              <AppHeaderHeading>{heading}</AppHeaderHeading>
            </>
          }
          right={
            <>
              <SearchModalTrigger />
              <AppHeaderThemeToggleButton />
              <AppHeaderLangMenuTrigger />
              {profileLinkContainer}
              <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
            </>
          }
        />
      </div>
    </AppHeaderBase>
  );
};
