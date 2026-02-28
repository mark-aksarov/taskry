import { mockedUserDetail } from "@/mocks/users";
import { ProjectDetail } from "../../ProjectDetail";
import { ProjectGridItem } from "../ProjectGridItem";
import { mockedProjectList } from "@/mocks/projects";
import type { Meta, StoryObj } from "@storybook/react";
import { EditProjectForm } from "../../EditProjectForm";
import { ProjectStatus } from "@/generated/prisma/enums";
import { UserDetail } from "@/components/users/UserDetail";
import { editProjectFormArgs } from "../../EditProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";

const meta = {
  title: "components/projects/ProjectGridItem",
  component: ProjectGridItem,
  decorators: [withSelectedProjectsProvider, withThemedBackground],
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = mockedProjectList[0];

export const Default = {
  args: {
    ...project,
    projectCommentsContainer: getCommentList(),
    editProjectFormContainer: <EditProjectForm {...editProjectFormArgs} />,
    projectDetailContainer: <ProjectDetail {...project} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    updateProjectStatus: () => {
      return new Promise((res) =>
        setTimeout(() => res({ status: "success" }), 500),
      );
    },
    deleteProject: () => ({ status: "success" }),
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a project title with a very long text for layout testing",
    creator: {
      ...Default.args.creator,
      fullName: "This is a user name with a very long text for layout testing",
    },
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
