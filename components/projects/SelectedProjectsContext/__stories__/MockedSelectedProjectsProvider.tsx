import { ProjectStatus } from "@/generated/prisma/enums";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";

export function MockedSelectedProjectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectedProjectsProvider
      pageItems={[
        { id: 1, status: ProjectStatus.active },
        { id: 2, status: ProjectStatus.active },
        { id: 3, status: ProjectStatus.active },
      ]}
    >
      {children}
    </SelectedProjectsProvider>
  );
}
