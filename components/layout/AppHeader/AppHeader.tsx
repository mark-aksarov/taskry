import { AppNavigation } from "../AppNavigation";
import { AppHeaderHeading } from "./AppHeaderHeading";
import { BackButton } from "@/components/common/BackButton";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";
import { AppHeaderThemeToggleButton } from "./AppHeaderThemeToggleButton";
import { SearchModalTrigger } from "@/components/search/SearchModalTrigger";

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
  const buttonClasses = "rounded-full p-3";

  return (
    <>
      <header className="sticky top-0 z-2 border-b border-gray-300 bg-gray-100 py-4 text-black max-md:px-4 md:px-6 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center gap-8 max-md:hidden">
          {
            <div className="flex flex-none items-center gap-4">
              {backButtonHref && <BackButton href={backButtonHref} />}
              <AppHeaderHeading>{heading}</AppHeaderHeading>
            </div>
          }
          <div className="flex flex-auto items-center justify-end gap-4">
            <SearchModalTrigger />
            <AppHeaderThemeToggleButton className={buttonClasses} />
            <AppHeaderLangMenuTrigger />
            {profileLinkContainer}
            <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          {profileLinkContainer}
          <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
        </div>
      </header>
    </>
  );
};
