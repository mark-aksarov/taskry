import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  ProjectDetail,
  ProjectDetailContainerProvider,
  ProjectDetailSkeleton,
} from "../ProjectDetail";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";

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

export const Default = {
  decorators: [
    (Story) => (
      <ProjectDetailContainerProvider
        ProjectDetailContainer={() => (
          <ProjectDetail {...ProjectDetailStory.args} />
        )}
      >
        <CommentsContainerProvider
          CommentsContainer={() => <MockedCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </ProjectDetailContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <ProjectDetailContainerProvider
        ProjectDetailContainer={() => <ProjectDetailSkeleton />}
      >
        <Story />
      </ProjectDetailContainerProvider>
    ),
  ],
} satisfies Story;
