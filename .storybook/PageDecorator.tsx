import { Layout } from "../app/(dashboard)/layout";
import { type Decorator } from "@storybook/react";
import { NotificationModalContent } from "../components/notifications/NotificationModalContent";
import { Default as NotificationModalContentStory } from "../components/notifications/NotificationModalContent/NotificationModalContent.stories";

export const PageDecorator: Decorator = (Story) => {
  return (
    <Layout
      NotificationModalContentContainer={() => (
        <NotificationModalContent {...NotificationModalContentStory.args} />
      )}
    >
      <Story />
    </Layout>
  );
};
