import Image from "next/image";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailPanel } from "./DetailPanel";
import { DetailNavigation } from "../DetailNavigation";
import { DetailPanelHeader } from "./DetailPanelHeader";
import { ImageContainer } from "../ImageContainer";
import { NavigationButton } from "../NavigationButton";
import {
  CalendarCheck,
  Info,
  KeyRound,
  Mail,
  Pencil,
  Trash,
} from "lucide-react";
import { Divider } from "@/components/ui";
import { DetailPanelInfo } from "./DetailPanelInfo";
import { DetailPanelTitle } from "./DetailPanelTitle";
import { DetailPanelText } from "./DetailPanelText";
import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";

const meta = {
  title: "Components/common/DetailPanel",
  component: DetailNavigation,
  tags: ["autodocs"],
  args: {
    children: null,
  },
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/info");
  },
} satisfies Meta<typeof DetailNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DetailPanel>
      <DetailPanelHeader>
        <ImageContainer className="h-21 w-21">
          <Image src="/man.jpg" alt="user avatar" fill />
        </ImageContainer>
        <DetailPanelInfo>
          <DetailPanelTitle>John Doe</DetailPanelTitle>
          <DetailPanelText>Designer</DetailPanelText>
        </DetailPanelInfo>
      </DetailPanelHeader>
      <DetailNavigation>
        <NavigationButton isActive={true} variant="secondary" href="/info">
          <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Profile Information
        </NavigationButton>
        <NavigationButton variant="secondary" href="/tasks">
          <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Assigned tasks
        </NavigationButton>
        <NavigationButton variant="secondary" href="/notifications">
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Notifications
        </NavigationButton>

        <Divider />

        <NavigationButton variant="secondary">
          <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Delete account
        </NavigationButton>
        <NavigationButton variant="secondary">
          <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Change password
        </NavigationButton>
        <NavigationButton variant="secondary">
          <Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Edit account
        </NavigationButton>
      </DetailNavigation>
    </DetailPanel>
  ),
};
