import { ProjectGridItem } from "../ProjectGridItem";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailModal } from "../../ProjectDetailModal";
import { ProjectCommentsModal } from "../../ProjectCommentsModal";
import { mockedProject } from "../../ProjectListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailBottomSheet } from "../../ProjectDetailBottomSheet";
import { ProjectDetailModalStory } from "../../ProjectDetailModal/__stories__";
import { ProjectItemActionMenuTrigger } from "../../ProjectItemActionMenuTrigger";
import { ProjectCommentsModalStory } from "../../ProjectCommentsModal/__stories__";
import { ProjectDetailBottomSheetStory } from "../../ProjectDetailBottomSheet/__stories__";
import { ProjectItemActionMenuTriggerStory } from "../../ProjectItemActionMenuTrigger/__stories__";

const meta = {
  title: "components/projects/ProjectGridItem",
  component: ProjectGridItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedProject,
    projectCommentsModal: (
      <ProjectCommentsModal {...ProjectCommentsModalStory.args} />
    ),
    menuTrigger: (
      <ProjectItemActionMenuTrigger
        {...ProjectItemActionMenuTriggerStory.args}
        className="-mr-2"
      />
    ),
    projectDetailModal: (
      <ProjectDetailModal {...ProjectDetailModalStory.args} />
    ),
    projectDetailBottomSheet: (
      <ProjectDetailBottomSheet {...ProjectDetailBottomSheetStory.args} />
    ),
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;

export const WithoutCreatorImage = {
  args: {
    ...Default.args,
    creator: {
      id: "user1",
      fullName: "Alice Smith",
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: ProjectStatus.active,
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: ProjectStatus.completed,
  },
} satisfies Story;
