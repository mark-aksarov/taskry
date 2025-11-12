import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchForm } from "./SearchForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/layout/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default = {} satisfies Story;
