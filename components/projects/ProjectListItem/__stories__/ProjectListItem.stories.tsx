import { ProjectListItem } from "../ProjectListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectDetailModal } from "../../ProjectDetailModal";
import { ProjectCommentsModal } from "../../ProjectCommentsModal";
import { UserDetailModal } from "@/components/users/UserDetailModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailModalStory } from "../../ProjectDetailModal/__stories__";
import { CustomerDetailModal } from "@/components/customer/CustomerDetailModal";
import { ProjectItemActionMenuTrigger } from "../../ProjectItemActionMenuTrigger";
import { ProjectCommentsModalStory } from "../../ProjectCommentsModal/__stories__";
import { UserDetailModalStory } from "@/components/users/UserDetailModal/__stories__";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { CustomerDetailModalStory } from "@/components/customer/CustomerDetailModal/__stories__";
import { ProjectItemActionMenuTriggerStory } from "../../ProjectItemActionMenuTrigger/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusContext/__stories__";

export const mockedProject = {
  id: 1,
  title: "Project 1",
  deadline: new Date("2025-01-01"),
  creator: {
    id: "user1",
    fullName: "User 1",
    imageUrl: "/woman.jpg",
  },
  status: ProjectStatus.pending,
  category: { id: 1, name: "Category 1" },
  customer: {
    id: 1,
    imageUrl: "/man.jpg",
    fullName: "Customer 1",
  },
  company: {
    id: 1,
    name: "Company 1",
  },
  tasksTotal: 10,
  tasksCompleted: 8,
  commentsCount: 5,
  showCheckbox: false,
};

const meta = {
  title: "components/projects/ProjectListItem",
  component: ProjectListItem,
  decorators: [
    withSelectedProjectsProvider,
    withDeleteProjectModalProvider,
    withUpdateProjectStatusesProvider,
    withThemedBackground,
  ],
  excludeStories: ["mockedProject"],
} satisfies Meta<typeof ProjectListItem>;

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
      />
    ),
    projectDetailModal: (
      <ProjectDetailModal {...ProjectDetailModalStory.args} />
    ),
    userDetailModal: <UserDetailModal {...UserDetailModalStory.args} />,
    customerDetailModal: (
      <CustomerDetailModal {...CustomerDetailModalStory.args} />
    ),
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
