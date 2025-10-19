"use client";

import { useParams } from "next/navigation";
import { PageTab, PageTabs } from "../common/PageTabs";

export function TaskPageTabs() {
  const { id } = useParams<{ id: string }>();

  return (
    <PageTabs>
      <PageTab id={`/tasks/${id}`}>Info</PageTab>
      <PageTab id={`/tasks/${id}/comments`}>Comments</PageTab>
      <PageTab id={`/tasks/${id}/subtasks`}>Subtasks</PageTab>
      <PageTab id={`/tasks/${id}/attachments`}>Attachments</PageTab>
    </PageTabs>
  );
}
