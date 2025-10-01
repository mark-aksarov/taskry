import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFilters } from "./ProjectFilters";
import { mocked } from "storybook/internal/test";
import { getProjectCategories } from "@/lib/queries/project";
import { getCustomers } from "@/lib/queries/customers";
import { projectCategoriesMock } from "../projectCategoriesMock";
import { customersMock } from "@/components/customer/customersMock";
import { getUsers } from "@/lib/queries/user";
import { usersMock } from "@/components/users/usersMock";

const meta: Meta<typeof ProjectFilters> = {
  title: "Components/projects/ProjectFilters",
  component: ProjectFilters,
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
} satisfies Meta<typeof ProjectFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
