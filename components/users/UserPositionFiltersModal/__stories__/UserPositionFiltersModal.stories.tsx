import {
  UserPositionFiltersForm,
  UserPositionFiltersFormSkeleton,
} from "../../UserPositionFiltersForm";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { UserPositionFiltersModal } from "../UserPositionFiltersModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserFiltersProvider } from "../../UserFiltersContext/__stories__";
import { useUserPositionFiltersModal } from "../UserPositionFiltersModalContext";
import { withUserPositionFiltersModalProvider } from "./withUserPositionFiltersModalProvider";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserPositionFiltersModal",
  component: UserPositionFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUserPositionFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUserPositionFiltersModalProvider,
    withUserFiltersProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserPositionFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <UserPositionFiltersForm
        positionCheckboxGroupItems={mockedPositionSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <UserPositionFiltersFormSkeleton />,
  },
} satisfies Story;
