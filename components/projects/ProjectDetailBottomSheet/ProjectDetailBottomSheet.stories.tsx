import {
  ProjectDetailBottomSheet,
  ProjectDetailBottomSheetProps,
} from "./ProjectDetailBottomSheet";
import { useOverlayTrigger } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useOverlayTriggerState } from "react-stately";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { ProjectDetail, ProjectDetailSkeleton } from "../ProjectDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";

const meta = {
  title: "components/projects/ProjectDetailBottomSheet",
  component: ProjectDetailBottomSheet,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  args: {
    projectDetailContainer: <ProjectDetail {...ProjectDetailStory.args} />,
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
    <OverlayTriggerStateContext.Provider value={state}>
      <Button {...triggerProps} label="Open Project Detail" />
      <ProjectDetailBottomSheet {...props} />
    </OverlayTriggerStateContext.Provider>
  );
};

export const Default = {
  args: {
    projectId: 1,
    projectDetailContainer: <ProjectDetail {...ProjectDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    projectId: 1,
    projectDetailContainer: <ProjectDetailSkeleton />,
  },
} satisfies Story;
