import { ProjectListItem } from "../ProjectListItem";
import { mockedProjectList } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withMockedProjectItemWrapper } from "../../ProjectItemWrapper/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesProvider/__stories__";

const mockedProject = mockedProjectList[0];

const meta = {
  title: "components/projects/ProjectListItem",
  component: ProjectListItem,
  decorators: [
    withMockedProjectItemWrapper,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withCurrentUserProvider,
    withSelectedProjectsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedProject,
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
