interface UserNavigationMobileLayoutProps {
  userInformationLink: React.ReactNode;
  assignedTasksLink: React.ReactNode;
}

export function UserNavigationMobileLayout({
  userInformationLink,
  assignedTasksLink,
}: UserNavigationMobileLayoutProps) {
  return (
    <nav className="flex gap-2 md:hidden">
      <>{userInformationLink}</>
      <>{assignedTasksLink}</>
    </nav>
  );
}
