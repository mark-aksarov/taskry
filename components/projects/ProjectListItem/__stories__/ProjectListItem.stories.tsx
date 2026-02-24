import { mockedUserDetail } from "@/mocks/users";
import { ProjectDetail } from "../../ProjectDetail";
import { ProjectListItem } from "../ProjectListItem";
import { mockedProjectList } from "@/mocks/projects";
import { EditProjectForm } from "../../EditProjectForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserDetail } from "@/components/users/UserDetail";
import { editProjectFormArgs } from "../../EditProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { getCommentList } from "@/components/comments/CommentList/__stories__";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/projects/ProjectListItem",
  component: ProjectListItem,
  decorators: [
    withSelectedProjectsProvider,
    withDeleteProjectModalProvider,
    withDeleteCommentModalProvider,
    withUpdateProjectStatusesProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = mockedProjectList[0];

export const Default = {
  args: {
    ...project,
    guestMode: false,
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
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    creator: undefined,
    customer: undefined,
    category: undefined,
    company: undefined,
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;
