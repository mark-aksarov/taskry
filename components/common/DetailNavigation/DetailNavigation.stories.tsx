import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailNavigation } from "./DetailNavigation";
import { NavigationButton } from "../NavigationButton";
import { Archive, Bell, Flag, Folder, Star } from "lucide-react";
import { Divider } from "@/components/ui";

const meta = {
  title: "Components/common/DetailNavigation",
  component: DetailNavigation,
  tags: ["autodocs"],
  args: {
    children: null,
  },
} satisfies Meta<typeof DetailNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <DetailNavigation>
      <NavigationButton isActive={true} variant="secondary" href="/info">
        <Star size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Button 1
      </NavigationButton>

      <NavigationButton variant="secondary" href="/info">
        <Bell size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Button 2
      </NavigationButton>

      <NavigationButton variant="secondary" href="/info">
        <Folder size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Button 3
      </NavigationButton>

      <Divider />

      <NavigationButton variant="secondary">
        <Archive size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Button 4
      </NavigationButton>

      <NavigationButton variant="secondary">
        <Flag size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Button 5
      </NavigationButton>
    </DetailNavigation>
  ),
} satisfies Story;
