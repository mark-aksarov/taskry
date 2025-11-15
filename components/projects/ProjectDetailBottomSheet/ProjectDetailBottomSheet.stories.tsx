import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetail, ProjectDetailSkeleton } from "../ProjectDetail";
import {
  ProjectDetailBottomSheet,
  ProjectDetailBottomSheetProps,
} from "./ProjectDetailBottomSheet";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";
import { ProjectDetailContainerProvider } from "../ProjectDetail/ProjectDetailContainerContext";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedCommentsContainer } from "@/components/comments/CommentsContainer";

const meta = {
  title: "components/projects/ProjectDetailBottomSheet",
  component: ProjectDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    projectId: 1,
    state: {
      isOpen: true,
      setOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
    },
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  render: (args) => <ProjectDetailBottomSheetTemplate {...args} />,
} satisfies Meta<typeof ProjectDetailBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProjectDetailBottomSheetTemplate = ({
  ...props
}: ProjectDetailBottomSheetProps) => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button {...triggerProps} label="Open Project Detail" />
      <ProjectDetailBottomSheet {...props} state={state} />
    </>
  );
};

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
        <CommentsContainerProvider
          CommentsContainer={() => <MockedCommentsContainer />}
        >
          <Story />
        </CommentsContainerProvider>
      </ProjectDetailContainerProvider>
    ),
  ],
} satisfies Story;
