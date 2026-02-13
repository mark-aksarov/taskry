import { Button } from "@/components/ui/Button";
import { NewCompanyForm } from "../NewCompanyForm";
import { NewCompanyModal } from "./NewCompanyModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewCompanyFormStory } from "../NewCompanyForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/companies/NewCompanyModal",
  component: NewCompanyModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New company" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newCompanyForm: <NewCompanyForm {...NewCompanyFormStory.args} />,
  },
} satisfies Story;
