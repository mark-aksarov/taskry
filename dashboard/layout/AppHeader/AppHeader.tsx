import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderLangMenuTrigger,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { AppNavigation } from "../AppNavigation";
import { AppHeaderHeading } from "./AppHeaderHeading";
import { BackButton } from "@/dashboard/common/BackButton";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
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
      <div className="max-md:px-4 md:px-6">
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
            </>
          }
          mobile={
            <>
              {profileLinkContainer}
              <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
            </>
          }
        />
      </div>
    </AppHeaderBase>
  );
};
