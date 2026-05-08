import {
  AppHeaderBase,
  AppHeaderLayout,
  AppHeaderHeading,
  AppHeaderLangButton,
  AppHeaderThemeToggleButton,
} from "@/common/AppHeaderBase";

import { Logo } from "../Logo";
import { tv } from "tailwind-variants";
import { AppNavigation } from "../AppNavigation";
import { LangMenuTrigger } from "../LangMenuTrigger";
import { BackButton } from "@/dashboard/common/BackButton";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { SearchModalTrigger } from "@/dashboard/search/SearchModalTrigger";
import { AppBottomSheetTrigger } from "@/dashboard/layout/AppBottomSheetTrigger";

const styles = tv({
  slots: {
    base: "border-(--border-primary) bg-(--surface-secondary)",

    mobileWrapper: "px-4 md:hidden",
    desktopWrapper: "px-6 max-md:hidden",
  },
});

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
  const { base, mobileWrapper, desktopWrapper } = styles();

  return (
    <AppHeaderBase className={base()}>
      <div className={mobileWrapper()}>
        <AppHeaderLayout
          left={<Logo />}
          right={<AppBottomSheetTrigger appNavigation={<AppNavigation />} />}
        />
      </div>

      <div className={desktopWrapper()}>
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
