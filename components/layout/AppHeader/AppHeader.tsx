import { AppNavigation } from "../AppNavigation";
import { AppHeaderHeading } from "./AppHeaderHeading";
import { BackButton } from "@/components/common/BackButton";
import { AppBottomSheetTrigger } from "../AppBottomSheetTrigger";
import { AppSidebarSheetTrigger } from "../AppSidebarSheetTrigger";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";
import { AppHeaderThemeToggleButton } from "./AppHeaderThemeToggleButton";
import { SearchModalTriggerMobile } from "@/components/search/SearchModalTriggerMobile";
import { SearchModalTriggerDesktop } from "@/components/search/SearchModalTriggerDesktop";
import { SearchModal } from "@/components/search/SearchModal";

export interface AppHeaderContainerProps {
  tasksSearchContainer: React.ReactNode;
  projectsSearchContainer: React.ReactNode;
  profileLinkContainer: React.ReactNode;
}

export interface AppHeaderProps extends AppHeaderContainerProps {
  heading: string;
  backButton?: boolean;
}

export const AppHeader = ({
  heading,
  backButton,
  tasksSearchContainer,
  projectsSearchContainer,
  profileLinkContainer,
}: AppHeaderProps) => {
  const buttonClasses = "rounded-full p-3";

  const searchModal = (
    <SearchModal
      tasksSearchContainer={tasksSearchContainer}
      projectsSearchContainer={projectsSearchContainer}
    />
  );

  return (
    <>
      <header className="sticky top-0 z-1 border-b border-gray-300 bg-gray-100 py-4 text-black max-md:px-4 md:px-6 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center gap-8 max-md:hidden">
          {
            <div className="flex flex-none items-center gap-4">
              {backButton && <BackButton />}
              <AppHeaderHeading>{heading}</AppHeaderHeading>
            </div>
          }
          <div className="flex flex-auto items-center justify-end gap-4">
            <SearchModalTriggerDesktop modal={searchModal} />
            <AppHeaderThemeToggleButton className={buttonClasses} />
            <AppHeaderLangMenuTrigger />
            {profileLinkContainer}
            <AppSidebarSheetTrigger appNavigation={<AppNavigation />} />
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          {profileLinkContainer}
          <div className="flex items-center gap-3">
            <SearchModalTriggerMobile
              modal={searchModal}
              className={buttonClasses}
            />
            <AppBottomSheetTrigger appNavigation={<AppNavigation />} />
          </div>
        </div>
      </header>
    </>
  );
};
