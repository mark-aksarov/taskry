import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderHeading,
  AppHeaderThemeToggleButton,
  AppHeaderLangButton,
} from "@/common/AppHeaderBase";

import { AppNavigation } from "../AppNavigation";
import { LangMenuTrigger } from "../LangMenuTrigger";
import { BackButton } from "@/dashboard/common/BackButton";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { AppBottomSheetTrigger } from "@/dashboard/layout/AppBottomSheetTrigger";

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
    <AppHeaderBase className="border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-900">
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
              <LangMenuTrigger renderButton={() => <AppHeaderLangButton />} />
              {profileLinkContainer}
              <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
            </>
          }
        />
      </div>
    </AppHeaderBase>
  );
};
