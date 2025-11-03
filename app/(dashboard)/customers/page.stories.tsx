import CustomersPage from "./page";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/decorators";
import { getUsers } from "@/lib/queries/user";
import { usersMock } from "@/lib/data/__mocks__/users";
import { getNotifications } from "@/lib/queries/notification";
import { notificationsMock } from "@/lib/data/__mocks__/notifications";
import { getCompanies } from "@/lib/queries/companies";
import { getCustomers } from "@/lib/queries/customers";
import { customersMock } from "@/lib/data/__mocks__/customers";
import { companiesMock } from "@/lib/data/__mocks__/companies";
import { usePathname } from "next/navigation";
import { default as PageLoading } from "./loading";

const meta = {
  title: "components/pages/Customers",
  component: CustomersPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator],
  beforeEach: () => {
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
    mocked(getNotifications).mockReturnValue(
      new Promise((res) => res(notificationsMock)),
    );
    mocked(getCustomers).mockReturnValue(
      new Promise((res) => res(customersMock)),
    );
    mocked(getCompanies).mockReturnValue(
      new Promise((res) => res(companiesMock)),
    );
    mocked(usePathname).mockReturnValue("/customers");
  },
} satisfies Meta<typeof CustomersPage>;

export default meta;
type Story = StoryObj<typeof CustomersPage>;

export const Default: Story = {};

export const Loading: Story = {
  render: () => <PageLoading />,
};

export const WithNoCustomers = {
  beforeEach: () => {
    mocked(getCustomers).mockReturnValue(new Promise((res) => res([])));
  },
} satisfies Story;
