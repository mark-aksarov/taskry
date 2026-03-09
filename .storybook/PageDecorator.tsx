import {
  TasksSearchPresentationStory,
  ProjectsSearchPresentationStory,
} from "@/components/search/SearchPresentation/__stories__";

import { type Decorator } from "@storybook/react";
import { ProfileLink } from "@/components/layout/ProfileLink";
import { SearchPresentation } from "@/components/search/SearchPresentation";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import DashboardTemplate from "@/app/[locale]/(dashboard)/(shared-layout)/DashboardTemplate";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout>
      <DashboardTemplate
        tasksSearchContainer={
          <SearchPresentation {...TasksSearchPresentationStory.args} />
        }
        projectsSearchContainer={
          <SearchPresentation {...ProjectsSearchPresentationStory.args} />
        }
        profileLinkContainer={
          <ProfileLink fullName="User 1" imageUrl="/man.jpg" />
        }
      >
        <Story />
      </DashboardTemplate>
    </DashboardLayout>
  );
};
