import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";
import { ProjectDetailSkeleton } from "../ProjectDetail";

const meta = {
  title: "components/projects/ProjectDetailModal",
  component: ProjectDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Project detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
  args: {
    projectId: 1,
  },
} satisfies Meta<typeof ProjectDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          ProjectDetailContainer: () => <ProjectDetailSkeleton />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
