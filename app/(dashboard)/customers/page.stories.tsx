import CustomersPage from "./page";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/decorators";
import { getUsers } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/components/notifications/NotificationOverlayList";
import { getCompanies } from "@/lib/queries/companies";
import { getCustomers } from "@/lib/queries/customers";
import { customersMock } from "@/lib/data/__mocks__/customers";
import { companiesMock } from "@/lib/data/__mocks__/companies";
import { useSelectedLayoutSegments } from "next/navigation";

const meta = {
  title: "components/pages/Customers",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock.slice(0, 5))),
    );
    mocked(getCustomers).mockReturnValue(
      new Promise((res) => res(customersMock)),
    );
    mocked(getCompanies).mockReturnValue(
      new Promise((res) => res(companiesMock)),
    );
    mocked(useSelectedLayoutSegments).mockReturnValue([
      "(dashboard)",
      "customers",
    ]);
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof CustomersPage>;

export const Default: Story = {};

export const WithNoCustomers = {
  beforeEach: () => {
    mocked(getCustomers).mockReturnValue(new Promise((res) => res([])));
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
