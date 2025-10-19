import { PageTab, PageTabs } from "../common/PageTabs";

export function ProfilePageTabs() {
  return (
    <PageTabs>
      <PageTab id="/profile">Info</PageTab>
      <PageTab id="/profile/projects">Projects</PageTab>
      <PageTab id="/profile/tasks">Tasks</PageTab>
    </PageTabs>
  );
}
