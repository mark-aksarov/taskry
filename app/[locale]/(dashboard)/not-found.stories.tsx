import NotFound from "./not-found";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { DashboardLayout } from "./DashboardLayout";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "pages/NotFoundPage",
  component: NotFound,
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
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    error: new Error("Something went wrong"),
  },
} satisfies Story;

export const CustomersNotFound = {
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/customers/123");
  },
} satisfies Story;

export const ProjectsNotFound = {
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects/456");
  },
} satisfies Story;

export const TasksNotFound = {
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/789");
  },
} satisfies Story;

export const UsersNotFound = {
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/team/1");
  },
} satisfies Story;

export const ProfileNotFound = {
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/profile/1");
  },
} satisfies Story;
