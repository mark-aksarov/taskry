import {
  UserFiltersForm,
  UserFiltersFormSkeleton,
} from "../../UserFiltersForm";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { UserFiltersModal } from "../UserFiltersModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { useUserFiltersModal } from "../UserFiltersModalContext";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUserFiltersModalProvider } from "./withUserFiltersModalProvider";
import { withUserFiltersProvider } from "../../UserFiltersContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const meta = {
  title: "components/users/UserFiltersModal",
  component: UserFiltersModal,
  decorators: [
    (Story) => {
      const { onOpenChange } = useUserFiltersModal();

      useEffect(() => onOpenChange(true), [onOpenChange]);

      return (
        <>
          <Button label="Open modal" onClick={() => onOpenChange(true)} />
          <Story />
        </>
      );
    },
    withUserFiltersModalProvider,
    withUserFiltersProvider,
    withPageTransitionProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof UserFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    filtersFormContainer: (
      <UserFiltersForm positionCheckboxGroupItems={mockedPositionSummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    filtersFormContainer: <UserFiltersFormSkeleton />,
  },
} satisfies Story;
