import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteProjectsModal } from "./DeleteProjectsModal";
import { DeleteProjectsProvider } from "../DeleteProjectsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";

const meta = {
  title: "dashboard/projects/DeleteProjectsModal",
  component: DeleteProjectsModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedProjectsProvider pageItems={[]}>
        <DeleteProjectsProvider>
          <Story />
        </DeleteProjectsProvider>
      </SelectedProjectsProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "deleteProjects",
  },
} satisfies Meta<typeof DeleteProjectsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
