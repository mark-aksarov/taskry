import { Search, Sun } from "lucide-react";
import { Button } from "@/components/ui";
import { SearchForm } from "../SearchForm";
import { LangMenuPopoverTrigger } from "../LangMenuTrigger";
import { ProfileLink } from "../ProfileLink";

interface AppHeaderProps {
  title: string;
  notificationPopoverTrigger: React.ReactNode;
  notificationSheetTrigger: React.ReactNode;
  appBottomSheetTrigger: React.ReactNode;
  appSidebarSheetTrigger: React.ReactNode;
}

export const AppHeader = ({
  title,
  notificationPopoverTrigger,
  notificationSheetTrigger,
  appBottomSheetTrigger,
  appSidebarSheetTrigger,
}: AppHeaderProps) => {
  const buttonClasses = "rounded-full p-3";

  return (
    <>
      <header className="sticky top-0 z-1 border-b border-gray-300 bg-gray-100 py-4 text-black max-md:px-4 md:px-6 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        <div className="flex items-center gap-8 max-md:hidden">
          {
            <div className="flex flex-none items-center gap-4">
              {appSidebarSheetTrigger}
              <h2 className="text-xl font-bold">{title}</h2>
            </div>
          }
          <div className="flex flex-auto items-center justify-end gap-4">
            <SearchForm />
            {notificationPopoverTrigger}
            <Button
              aria-label="theme"
              variant="ghost"
              iconLeft={<Sun size={16} strokeWidth={1.5} absoluteStrokeWidth />}
              className={buttonClasses}
            />
            <LangMenuPopoverTrigger />
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
            {notificationSheetTrigger}
            {appBottomSheetTrigger}
          </div>
        </div>
      </header>
    </>
  );
};
