import { type Decorator } from "@storybook/react";
import { DeletePositionModal } from "../DeletePositionModal";

export const withDeletePositionModal: Decorator = (Story) => {
  return (
    <>
      <Story />
      <DeletePositionModal positionId={1} positionName="Position 1" />
    </>
  );
};
