import { PageGrid } from "@/components/common/PageGrid";
import { PageTabs } from "@/components/common/PageTabs";
import { PageTab } from "@/components/common/PageTabs";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageGrid>
      <PageTabs>
        <PageTab id="/profile">Info</PageTab>
        <PageTab id="/profile/projects">Projects</PageTab>
        <PageTab id="/profile/tasks">Tasks</PageTab>
      </PageTabs>

      {children}
    </PageGrid>
  );
}
