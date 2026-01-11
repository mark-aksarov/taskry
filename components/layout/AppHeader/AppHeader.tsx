import { Button } from "@/components/ui";
import { Search } from "lucide-react";
import { ProfileLink } from "../ProfileLink";
import { AppHeaderTitle } from "./AppHeaderTitle";
import { AppHeaderSearchForm } from "./AppHeaderSearchForm";
import { AppHeaderLangMenuTrigger } from "./AppHeaderLangMenuTrigger";
import { AppHeaderThemeToggleButton } from "./AppHeaderThemeToggleButton";
import { NotificationModalTrigger } from "@/components/notifications/NotificationModalTrigger";

interface AppHeaderProps {
  guestMode?: boolean;
  appBottomSheetTrigger: React.ReactNode;
  appSidebarSheetTrigger: React.ReactNode;
}

export const AppHeader = ({
  guestMode,
  appBottomSheetTrigger,
  appSidebarSheetTrigger,
}: AppHeaderProps) => {
  const buttonClasses = "rounded-full p-3";

  const notificationModalTrigger = (
    <NotificationModalTrigger guestMode={guestMode} />
  );

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
            <AppHeaderSearchForm />
            {notificationModalTrigger}

            <AppHeaderThemeToggleButton className={buttonClasses} />

            <AppHeaderLangMenuTrigger />
            <ProfileLink />
          </div>
        </div>

        <div className="flex items-center justify-between md:hidden">
          <ProfileLink />
          <div className="flex items-center gap-3">
            <Button
              aria-label="theme"
              variant="ghost"
              iconLeft={
                <Search size={16} strokeWidth={1.5} absoluteStrokeWidth />
              }
              className={buttonClasses}
            />
            {notificationModalTrigger}
            {appBottomSheetTrigger}
          </div>
        </div>
      </header>
    </>
  );
};
