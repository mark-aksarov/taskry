import { mockedUserDetail } from "@/mocks/users";
import { ProjectDetail } from "../../ProjectDetail";
import { ProjectListItem } from "../ProjectListItem";
import { mockedProjectList } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { UserDetail } from "@/components/users/UserDetail";
import { mockedPositionSummaries } from "@/mocks/positions";
import { EditUserForm } from "@/components/users/EditUserForm";
import { CommentList } from "@/components/comments/CommentList";
import { CustomerDetail } from "@/components/customer/CustomerDetail";
import { UserDetailHeader } from "@/components/users/UserDetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CommentListStory } from "@/components/comments/CommentList/__stories__";
import { CustomerDetailHeader } from "@/components/customer/CustomerDetailHeader";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext/__stories__";

const meta = {
  title: "components/projects/ProjectListItem",
  component: ProjectListItem,
  decorators: [
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedProject = mockedProjectList[0];

export const Default = {
  args: {
    ...mockedProject,
    projectCommentsContainer: <CommentList {...CommentListStory.args} />,
    editProjectFormContainer: (
      <EditUserForm
        {...mockedUserDetail}
        userId={mockedUserDetail.id}
        positionSelectItems={mockedPositionSummaries}
      />
    ),
    projectDetailContainer: <ProjectDetail {...mockedProject} />,
    userDetailContainer: <UserDetail {...mockedUserDetail} />,
    userDetailHeaderContainer: (
      <UserDetailHeader
        fullName={mockedUserDetail.fullName}
        positionName={mockedUserDetail.position.name}
        imageUrl={mockedUserDetail.imageUrl}
      />
    ),
    customerDetailContainer: <CustomerDetail {...mockedCustomerDetail} />,
    customerDetailHeaderContainer: (
      <CustomerDetailHeader
        companyName={mockedCustomerDetail.company.name}
        fullName={mockedCustomerDetail.fullName}
        imageUrl={mockedCustomerDetail.imageUrl}
      />
    ),
    sendComment: () => ({ status: "success" }),
    updateComment: () => ({ status: "success" }),
    updateProject: () => ({ status: "success" }),
    deleteProject: () => ({ status: "success" }),
    updateProjectStatus: () => ({ status: "success" }),
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
    customer: {
      ...Default.args.customer,
      fullName:
        "This is a customer name with a very long text for layout testing",
    },
    category: {
      ...Default.args.category,
      name: "This is a category name with a very long text for layout testing",
    },
    company: {
      ...Default.args.company,
      name: "This is a company name with a very long text for layout testing",
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

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
