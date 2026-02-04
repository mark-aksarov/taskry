import { Button } from "@/components/ui/Button";
import { NewCompanyForm } from "../NewCompanyForm";
import { NewCompanyModal } from "./NewCompanyModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyFormSkeleton } from "../CompanyFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewCompanyFormStory } from "../NewCompanyForm/NewCompanyForm.stories";

const meta = {
  title: "Components/companies/NewCompanyModal",
  component: NewCompanyModal,
  tags: ["autodocs"],
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

export const Skeleton = {
  args: {
    newCompanyForm: <CompanyFormSkeleton />,
  },
} satisfies Story;
