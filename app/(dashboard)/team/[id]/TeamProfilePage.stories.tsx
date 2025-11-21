import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TeamProfilePage } from "./TeamProfilePage";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { mocked } from "storybook/test";
import { useParams, usePathname } from "next/navigation";
import {
  Default as ProfileDefaultStory,
  Loading as ProfileLoadingStory,
  WithoutSomeData as ProfileWithoutSomeDataStory,
} from "@/app/(dashboard)/profile/ProfilePage.stories";

const meta = {
  title: "components/pages/TeamProfilePage",
  component: TeamProfilePage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue(
      "/team/BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    );
    mocked(useParams).mockReturnValue({
      id: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
    });
  },
  args: {
    userId: "BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI",
  },
} satisfies Meta<typeof TeamProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  ...ProfileDefaultStory,
} satisfies Story;

export const Loading: Story = {
  ...ProfileLoadingStory,
} satisfies Story;

export const WithoutSomeData: Story = {
  ...ProfileWithoutSomeDataStory,
} satisfies Story;
