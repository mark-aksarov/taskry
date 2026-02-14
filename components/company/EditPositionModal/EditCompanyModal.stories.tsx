import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditCompanyForm } from "../EditCompanyForm";
import { EditCompanyModal } from "./EditCompanyModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditCompanyFormStory } from "../EditCompanyForm/__stories__";

const meta = {
  title: "components/positions/EditCompanyModal",
  component: EditCompanyModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit position" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editCompanyForm: <EditCompanyForm {...EditCompanyFormStory.args} />,
  },
} satisfies Story;
