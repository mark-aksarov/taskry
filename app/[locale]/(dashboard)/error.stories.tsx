import error from "./error";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/ErrorPage",
  component: error,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <DashboardLayout>
        <Story />
      </DashboardLayout>
    ),
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/");
  },
  args: {
    reset: () => {},
  },
} satisfies Meta<typeof error>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    error: new Error("Something went wrong"),
  },
} satisfies Story;

export const CompanyNotFound = {
  args: {
    error: Object.assign(new Error("Company not found"), {
      cause: "companyNotFound",
    }),
  },
} satisfies Story;

export const CustomerNotFound = {
  args: {
    error: Object.assign(new Error("Customer not found"), {
      cause: "customerNotFound",
    }),
  },
} satisfies Story;

export const PositionNotFound = {
  args: {
    error: Object.assign(new Error("Position not found"), {
      cause: "positionNotFound",
    }),
  },
} satisfies Story;

export const TaskCategoryNotFound = {
  args: {
    error: Object.assign(new Error("Task category not found"), {
      cause: "taskCategoryNotFound",
    }),
  },
} satisfies Story;

export const ProjectCategoryNotFound = {
  args: {
    error: Object.assign(new Error("Project category not found"), {
      cause: "projectCategoryNotFound",
    }),
  },
} satisfies Story;

export const ProjectNotFound = {
  args: {
    error: Object.assign(new Error("Project not found"), {
      cause: "projectNotFound",
    }),
  },
} satisfies Story;

export const TaskNotFound = {
  args: {
    error: Object.assign(new Error("Task not found"), {
      cause: "taskNotFound",
    }),
  },
} satisfies Story;

export const UserNotFound = {
  args: {
    error: Object.assign(new Error("User not found"), {
      cause: "userNotFound",
    }),
  },
} satisfies Story;
