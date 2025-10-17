import { PageGrid } from "@/components/common/PageGrid";
import { PageTabs } from "@/components/common/PageTabs";
import { PageTab } from "@/components/common/PageTabs";

export default async function TaskLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageGrid>
      <PageTabs>
        <PageTab id={`/tasks/${id}`}>Info</PageTab>
        <PageTab id={`/tasks/${id}/comments`}>Comments</PageTab>
        <PageTab id={`/tasks/${id}/subtasks`}>Subtasks</PageTab>
        <PageTab id={`/tasks/${id}/attachments`}>Attachments</PageTab>
      </PageTabs>

      {children}
    </PageGrid>
  );
}
