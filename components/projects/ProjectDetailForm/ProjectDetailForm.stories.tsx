import { ProjectDetailForm } from "./ProjectDetailForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailFormStatusSelect } from "./ProjectDetailFormStatusSelect";
import { ProjectDetailFormCategorySelect } from "./ProjectDetailFormCategorySelect";
import { ProjectDetailFormCustomerSelect } from "./ProjectDetailFormCustomerSelect";

const meta = {
  title: "Components/projects/ProjectDetailForm",
  component: ProjectDetailForm,
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProjectDetailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    statusSelect: <ProjectDetailFormStatusSelect />,
    categorySelect: (
      <ProjectDetailFormCategorySelect
        categories={[
          { id: 1, name: "Design & UX" },
          { id: 2, name: "Development & Engineering" },
          { id: 3, name: "Marketing & Strategy" },
          { id: 4, name: "Data & Analytics" },
          { id: 5, name: "SEO Optimization" },
          { id: 6, name: "CRM & Integrations" },
          { id: 7, name: "Advertising & Campaigns" },
          { id: 8, name: "Business Intelligence" },
        ]}
      />
    ),
    customerSelect: (
      <ProjectDetailFormCustomerSelect
        customers={[
          {
            id: 1,
            fullName: "Lisa Simpson",
          },
          {
            id: 2,
            fullName: "Mark Johnson",
          },
          {
            id: 3,
            fullName: "Emily Chen",
          },
          {
            id: 4,
            fullName: "Carlos Rivera",
          },
        ]}
      />
    ),
  },
} satisfies Story;
