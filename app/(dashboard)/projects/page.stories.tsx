import ProjectsPage from "./page";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/decorators";
import { getProjectCategories, getProjects } from "@/lib/queries/project";
import { projectCategoriesMock } from "@/lib/data/__mocks__/projectCategories";
import { customersMock } from "@/lib/data/__mocks__/customers";
import { getCustomers } from "@/lib/queries/customers";
import { getUsers } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { projectsMock } from "@/lib/data/__mocks__/projects";
import { usePathname } from "next/navigation";

const meta = {
  title: "components/pages/Projects",
  component: ProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getProjectCategories).mockReturnValue(
      new Promise((res) => res(projectCategoriesMock)),
    );
    mocked(getCustomers).mockReturnValue(
      new Promise((res) => res(customersMock)),
    );
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(getProjects).mockReturnValue(
      new Promise((res) => res(projectsMock)),
    );
    mocked(usePathname).mockReturnValue("/projects");
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof ProjectsPage>;

export const Default: Story = {};

export const WithNoProjects = {
  beforeEach: () => {
    mocked(getProjects).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;

export const Tablet: Story = {
  globals: {
    viewport: { value: "ipad", isRotated: true },
  },
};

export const Mobile = {
  globals: {
    viewport: { value: "iphone6", isRotated: false },
  },
} satisfies Story;
