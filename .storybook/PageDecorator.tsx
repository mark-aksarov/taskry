import { type Decorator } from "@storybook/react";
import { SearchModal } from "@/components/search/SearchModal";
import DashboardTemplate from "@/app/[locale]/(dashboard)/DashboardTemplate";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import { NotificationModalContent } from "@/components/notifications/NotificationModalContent";
import { Default as SearchModalStory } from "../components/search/SearchModal/SearchModal.stories";
import { Default as NotificationModalContentStory } from "../components/notifications/NotificationModalContent/NotificationModalContent.stories";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout>
      <DashboardTemplate
        notificationModalContentContainer={
          <NotificationModalContent {...NotificationModalContentStory.args} />
        }
        searchModal={<SearchModal {...SearchModalStory.args} />}
      >
        <Story />
      </DashboardTemplate>
    </DashboardLayout>
  );
};
