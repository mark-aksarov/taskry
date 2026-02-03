import { type Decorator } from "@storybook/react";
import { SearchModal } from "@/components/search/SearchModal";
import DashboardTemplate from "@/app/[locale]/(dashboard)/DashboardTemplate";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import { Default as SearchModalStory } from "../components/search/SearchModal/SearchModal.stories";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout>
      <DashboardTemplate
        searchModal={<SearchModal {...SearchModalStory.args} />}
      >
        <Story />
      </DashboardTemplate>
    </DashboardLayout>
  );
};
