import { mocked } from "storybook/test";
import { getCustomers } from "@/lib/queries/customers";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFiltersForm } from "./ProjectFiltersForm";
import { getProjectCategories } from "@/lib/queries/project";
import { projectCategoriesMock } from "../projectCategoriesMock";
import { customersMock } from "@/components/customer/customersMock";
import { usersMock } from "@/components/users/usersMock";
import { getUsers } from "@/lib/queries/user";
import { ProjectCategoryCheckboxGroup } from "../ProjectCategoryCheckboxGroup";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";
import { UserCheckboxGroup } from "@/components/users/UserCheckboxGroup";
import { ProjectFiltersFormSkeleton } from "./ProjectFiltersFormSkeleton";

const meta: Meta<typeof ProjectFiltersForm> = {
  title: "Components/projects/ProjectFiltersForm",
  component: ProjectFiltersForm,
  tags: ["autodocs"],
  beforeEach: () => {
    mocked(getProjectCategories).mockReturnValue(
      new Promise((res) => res(projectCategoriesMock)),
    );
    mocked(getCustomers).mockReturnValue(
      new Promise((res) => res(customersMock)),
    );
    mocked(getUsers).mockReturnValue(new Promise((res) => res(usersMock)));
  },
  render: (args) => {
    const categoriesPromise = getProjectCategories(1);
    const customersPromise = getCustomers(1);
    const usersPromise = getUsers(1);

    return (
      <ProjectFiltersForm
        {...args}
        projectCategoryCheckboxGroup={
          <ProjectCategoryCheckboxGroup categoriesPromise={categoriesPromise} />
        }
        customerCheckboxGroup={
          <CustomerCheckboxGroup customersPromise={customersPromise} />
        }
        userCheckboxGroup={<UserCheckboxGroup usersPromise={usersPromise} />}
      />
    );
  },
} satisfies Meta<typeof ProjectFiltersForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Skeleton: Story = {
  render: () => <ProjectFiltersFormSkeleton />,
};
