import {
  ProjectDetailBottomSheet,
  ProjectDetailBottomSheetProps,
} from "./ProjectDetailBottomSheet";
import { Button } from "@/components/ui";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailCompactSkeleton } from "../ProjectDetailCompact";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

const meta = {
  title: "components/projects/ProjectDetailBottomSheet",
  component: ProjectDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    projectId: 1,
    state: {
      isOpen: true,
      setOpen: () => {},
      open: () => {},
      close: () => {},
      toggle: () => {},
    },
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
  render: (args) => <ProjectDetailBottomSheetTemplate {...args} />,
} satisfies Meta<typeof ProjectDetailBottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProjectDetailBottomSheetTemplate = ({
  ...props
}: ProjectDetailBottomSheetProps) => {
  const state = useOverlayTriggerState({});
  const { triggerProps } = useOverlayTrigger({ type: "dialog" }, state);

  return (
    <>
      <Button {...triggerProps} label="Open Project Detail" />
      <ProjectDetailBottomSheet {...props} state={state} />
    </>
  );
};

export const Default = {} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          ProjectDetailCompactContainer: () => <ProjectDetailCompactSkeleton />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
