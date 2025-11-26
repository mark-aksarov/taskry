import { type Decorator } from "@storybook/react";
import { DashboardLayout } from "../app/[locale]/(dashboard)/DashboardLayout";
import { NotificationModalContent } from "../components/notifications/NotificationModalContent/NotificationModalContent";
import { Default as NotificationModalContentStory } from "../components/notifications/NotificationModalContent/NotificationModalContent.stories";

export const PageDecorator: Decorator = (Story) => {
  return (
    <DashboardLayout
      NotificationModalContentContainer={() => (
        <NotificationModalContent {...NotificationModalContentStory.args} />
      )}
    >
      <Story />
    </DashboardLayout>
  );
};
