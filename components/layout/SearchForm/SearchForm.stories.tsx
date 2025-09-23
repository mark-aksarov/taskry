import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchForm } from "./SearchForm";

const meta = {
  title: "Components/layout/SearchForm",
  component: SearchForm,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {};
