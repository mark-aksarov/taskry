import { ProfileTaskList } from "../ProfileTaskList";
import { ProfileTasksEmptySection } from "../ProfileTasksEmptySection";

export function ProfileTasksDesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) {
    return (
      <div className="flex flex-auto items-center justify-center max-md:hidden">
        <ProfileTasksEmptySection />
      </div>
    );
  }

  return (
    <ProfileTaskList className="max-md:hidden">{children}</ProfileTaskList>
  );
}
