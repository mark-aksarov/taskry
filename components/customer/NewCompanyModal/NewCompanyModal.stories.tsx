import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { NewCompanyForm } from "../NewCompanyForm";
import { NewCompanyModal } from "./NewCompanyModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CompanyFormBaseSkeleton } from "../CompanyFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as CompanyFormBaseStory } from "../CompanyFormBase/CompanyFormBase.stories";

const meta = {
  title: "Components/customers/NewCompanyModal",
  component: NewCompanyModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New company" />
        <Suspense>
          <Story />
        </Suspense>
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newCompanyForm: <NewCompanyForm {...CompanyFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newCompanyForm: <CompanyFormBaseSkeleton />,
  },
} satisfies Story;
