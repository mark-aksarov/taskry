import { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProfileProjectsPage from "./page";
import { mocked } from "storybook/test";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { getUserById } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getProjects } from "@/lib/queries/project";
import { projectsMock } from "@/lib/data/__mocks__/projects";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { PageDecorator } from "@/.storybook/decorators";

const meta: Meta<typeof ProfileProjectsPage> = {
  title: "components/pages/ProfileProjects",
  component: ProfileProjectsPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getProjects).mockReturnValue(
      new Promise((res) => res(projectsMock)),
    );
    mocked(getUserById).mockReturnValue(
      new Promise((res) => res(usersMock[0])),
    );
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(usePathname).mockReturnValue("/profile/projects");
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "profile",
      "projects",
    ]);
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

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
