import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchForm } from "./SearchForm";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/layout/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default = {} satisfies Story;
