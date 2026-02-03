import { ProfileLink } from "../ProfileLink";
import { AppHeaderTitle } from "./AppHeaderTitle";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";
import { AppHeaderThemeToggleButton } from "./AppHeaderThemeToggleButton";
import { SearchModalTriggerMobile } from "@/components/search/SearchModalTriggerMobile";
import { SearchModalTriggerDesktop } from "@/components/search/SearchModalTriggerDesktop";

interface AppHeaderProps {
  appBottomSheetTrigger: React.ReactNode;
  appSidebarSheetTrigger: React.ReactNode;
  searchModal: React.ReactNode;
}

export const AppHeader = ({
  appBottomSheetTrigger,
  appSidebarSheetTrigger,
  searchModal,
}: AppHeaderProps) => {
  const buttonClasses = "rounded-full p-3";

  return (
    <>
      <header className="sticky top-0 z-1 border-b border-gray-300 bg-gray-100 py-4 text-black max-md:px-4 md:px-6 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center gap-8 max-md:hidden">
          {
            <div className="flex flex-none items-center gap-4">
              {appSidebarSheetTrigger}
              <AppHeaderTitle />
            </div>
          }
          <div className="flex flex-auto items-center justify-end gap-4">
            <SearchModalTriggerDesktop modal={searchModal} />
            <AppHeaderThemeToggleButton className={buttonClasses} />
            <AppHeaderLangMenuTrigger />
            <ProfileLink />
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <ProfileLink />
          <div className="flex items-center gap-3">
            <SearchModalTriggerMobile
              modal={searchModal}
              className={buttonClasses}
            />
            {appBottomSheetTrigger}
          </div>
        </div>
      </header>
    </>
  );
};
